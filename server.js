// =============================================================================
// AROMA SIGNATURE+ — LOCAL DEV SERVER
// =============================================================================
//
// Purpose: Serve the static site AND provide a file-writing API so that
//          Admin CRUD changes are permanently saved to js/products.js on disk.
//
// Usage:
//   npm install
//   npm start        (then open http://localhost:3000)
//
// API Endpoints:
//   GET  /api/products          — Returns the current product array from disk
//   POST /api/save-products     — Receives product array, rewrites js/products.js
//   GET  /api/ping              — Health check (returns { ok: true })
//
// =============================================================================

const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = 3000;

// Absolute path to the canonical products data file
const PRODUCTS_FILE = path.join(__dirname, 'js', 'products.js');

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));          // Parse JSON bodies (large for base64 images)
app.use(express.static(__dirname));                 // Serve all static site files

// ─── CORS headers (allow same-origin, Anti Gravity preview, and file:// origins) ──
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/ping', (req, res) => {
  res.json({ ok: true, message: 'Aroma Signature+ dev server is running.' });
});

// ─── GET /api/products ────────────────────────────────────────────────────────
// Reads js/products.js from disk, extracts the PRODUCTS_DATA array, and
// returns it as JSON. This is the authoritative read endpoint.
app.get('/api/products', (req, res) => {
  try {
    const source = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    const products = extractProductsFromSource(source);
    res.json({ ok: true, products });
  } catch (err) {
    console.error('[API] Failed to read products file:', err.message);
    res.status(500).json({ ok: false, error: 'Failed to read products file.' });
  }
});

// ─── POST /api/save-products ──────────────────────────────────────────────────
// Receives the full updated products array as JSON in the request body.
// Rebuilds js/products.js on disk, preserving the file header comments,
// ProductCatalog helpers, and all other existing content below PRODUCTS_DATA.
app.post('/api/save-products', (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ ok: false, error: 'Request body must contain a "products" array.' });
    }

    // Read current file to preserve content around the PRODUCTS_DATA declaration
    const currentSource = fs.readFileSync(PRODUCTS_FILE, 'utf8');

    // Build the new file content
    const newSource = rebuildProductsFile(currentSource, products);

    // Write atomically: write to a temp file then rename to avoid partial writes
    const tmpFile = PRODUCTS_FILE + '.tmp';
    fs.writeFileSync(tmpFile, newSource, 'utf8');
    fs.renameSync(tmpFile, PRODUCTS_FILE);

    console.log(`[API] js/products.js updated — ${products.length} products written.`);
    res.json({ ok: true, count: products.length });
  } catch (err) {
    console.error('[API] Failed to save products:', err.message);
    res.status(500).json({ ok: false, error: 'Failed to write products file: ' + err.message });
  }
});

// ─── Helper: Extract PRODUCTS_DATA array from source text ────────────────────
// Uses Node's vm module to safely evaluate only the products array.
function extractProductsFromSource(source) {
  const vm = require('vm');
  const sandbox = {};
  try {
    const startMarker = /let PRODUCTS_DATA\s*=\s*\[/;
    const startMatch = startMarker.exec(source);
    if (!startMatch) return [];

    const arrayStart = startMatch.index + startMatch[0].length - 1;
    let depth = 0;
    let endIdx = -1;
    for (let i = arrayStart; i < source.length; i++) {
      const ch = source[i];
      if (ch === '[' || ch === '{') depth++;
      else if (ch === ']' || ch === '}') {
        depth--;
        if (depth === 0) { endIdx = i; break; }
      }
    }
    if (endIdx === -1) return [];

    const arrayStr = source.slice(arrayStart, endIdx + 1);
    vm.createContext(sandbox);
    vm.runInContext(`PRODUCTS_DATA = ${arrayStr}`, sandbox, { timeout: 2000 });
    return Array.isArray(sandbox.PRODUCTS_DATA) ? sandbox.PRODUCTS_DATA : [];
  } catch (e) {
    console.error('[API] Could not parse products from source:', e.message);
    return [];
  }
}

// ─── Helper: Rebuild js/products.js with new products array ──────────────────
// Preserves the file header, the PRODUCTS_DATA declaration format,
// and everything after the array (ProductCatalog helpers etc.)
function rebuildProductsFile(currentSource, products) {
  const serialized = JSON.stringify(products, null, 2);

  const startMarker = /let PRODUCTS_DATA\s*=\s*\[/;
  const startMatch = startMarker.exec(currentSource);
  if (!startMatch) {
    throw new Error('Could not find "let PRODUCTS_DATA = [" in products.js');
  }

  const beforeArray = currentSource.slice(0, startMatch.index);

  const arrayStart = startMatch.index + startMatch[0].length - 1; // position of '['
  let depth = 0;
  let endIdx = -1;
  for (let i = arrayStart; i < currentSource.length; i++) {
    const ch = currentSource[i];
    if (ch === '[' || ch === '{') depth++;
    else if (ch === ']' || ch === '}') {
      depth--;
      if (depth === 0) { endIdx = i; break; }
    }
  }

  if (endIdx === -1) {
    throw new Error('Could not find closing bracket of PRODUCTS_DATA array in products.js');
  }

  let afterArray = currentSource.slice(endIdx + 1);
  if (afterArray.startsWith(';')) {
    afterArray = afterArray.slice(1);
  }
  afterArray = afterArray.replace(/^\r?\n/, '');

  return `${beforeArray}let PRODUCTS_DATA = ${serialized};\n\n${afterArray}`;
}

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║        Aroma Signature+ Local Dev Server             ║');
  console.log('╠══════════════════════════════════════════════════════╣');
  console.log(`║  Site:   http://localhost:${PORT}                       ║`);
  console.log(`║  Admin:  http://localhost:${PORT}/admin.html             ║`);
  console.log('║                                                      ║');
  console.log('║  Admin CRUD changes will be permanently written      ║');
  console.log('║  to js/products.js on disk.                          ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log('');
});
