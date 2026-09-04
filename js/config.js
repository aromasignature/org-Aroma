// =============================================================================
// AROMA SIGNATURE+ — WEBSITE CONFIGURATION & DATA SYNC
// =============================================================================
//
// This file contains business details, hero banners, and showcase slideshow data.
// All values automatically synchronize with the Admin Panel (localStorage database)
// so any changes made in Admin reflect across the entire live website instantly.
//
// =============================================================================

const DEFAULT_SITE_CONFIG = {
  // ─── Brand ─────────────────────────────────────────────────────────────
  brandName: "Aroma Signature+",
  tagline: "Symbol of Beauty",
  siteUrl: "https://www.aromasignature.in",

  // ─── Contact ───────────────────────────────────────────────────────────
  phone: "8086339777",                     // Main phone number
  email: "aromasignature.in@gmail.com",     // Contact email
  whatsappNumber: "918086339777",          // WhatsApp number (no + or spaces)

  // ─── Social Media ──────────────────────────────────────────────────────
  instagramUrl: "https://www.instagram.com/aromasignature_plus/",
  facebookUrl: "https://www.facebook.com/aromasignatureplus",
  youtubeUrl: "https://www.youtube.com/@aromasignatureplus",
  whatsappUrl: "https://wa.me/918086339777",
  linkedinUrl: "",

  // ─── Address ───────────────────────────────────────────────────────────
  address: "India",
  city: "",
  state: "",
  pincode: "",

  // ─── Announcement Bar ──────────────────────────────────────────────────
  announcementText: "FREE DELIVERY ON ONLINE ORDERS",
  showAnnouncement: true,

  // ─── Delivery Information ──────────────────────────────────────────────
  deliveryInfo: "Free delivery on all online orders across India",
  estimatedDelivery: "5-7 business days",

  // ─── Currency ──────────────────────────────────────────────────────────
  currency: "₹",
  currencyCode: "INR",

  // ─── WhatsApp Message Templates ────────────────────────────────────────
  whatsappOrderMessage: "Hi! I'm interested in ordering *{product}* (₹{price}) from Aroma Signature+. Please share the details.",
  whatsappGeneralMessage: "Hi! I'd like to know more about Aroma Signature+ products.",

  // ─── SEO Defaults ──────────────────────────────────────────────────────
  metaTitle: "Aroma Signature+ | Premium Beauty Care",
  metaDescription: "Discover premium skincare, facial kits, hair care & self-care products crafted with nature's finest ingredients. Aroma Signature+ — Symbol of Beauty.",
  metaKeywords: "skincare, beauty, hair care, facial kits, natural beauty, Aroma Signature+, premium beauty products, Indian beauty brand",

  // ─── Navigation ────────────────────────────────────────────────────────
  navigation: [
    { label: "Home", url: "index.html" },
    { label: "Best Seller", url: "shop.html?filter=bestseller" },
    {
      label: "Shop",
      url: "shop.html",
      submenu: [
        { label: "Skin Care", url: "categories/skin-care.html" },
        { label: "Facial Kits", url: "categories/facial-kits.html" },
        { label: "Hair Care", url: "categories/hair-care.html" },
        { label: "Hair Treatment", url: "categories/hair-treatment.html" },
        { label: "Self Care", url: "categories/self-care.html" },
      ],
    },
    { label: "Offers", url: "offers.html" },
    { label: "About Us", url: "about.html" },
    { label: "Contacts", url: "contact.html" },
  ],

  // ─── Categories ────────────────────────────────────────────────────────
  categories: [
    { id: "skin-care", name: "Skin Care", icon: "✦", url: "categories/skin-care.html" },
    { id: "facial-kits", name: "Facial Kits", icon: "✦", url: "categories/facial-kits.html" },
    { id: "hair-care", name: "Hair Care", icon: "✦", url: "categories/hair-care.html" },
    { id: "hair-treatment", name: "Hair Treatment", icon: "✦", url: "categories/hair-treatment.html" },
    { id: "self-care", name: "Self Care", icon: "✦", url: "categories/self-care.html" },
  ],

  // ─── Images / Assets ──────────────────────────────────────────────────
  logoPath: "Images/logo.png",
  faviconPath: "Images/favicon.png",
};

// ─── Hero Carousel Banners (Default) ──────────────────────────────────────────
const DEFAULT_BANNER_SLIDES = [
  {
    id: "banner-1",
    image: "Images/Banner1.png",
    subtitle: "✦ Professional Beauty Care ✦",
    title: "",
    desc: "",
    ctaText: "Explore Collection",
    ctaUrl: "shop.html",
    ctaText2: "",
    ctaUrl2: "",
    enabled: true
  }
];

// ─── Botanical Facial & Skin Showcase Slideshow (Default) ─────────────────────
const DEFAULT_SHOWCASE_SLIDES = [
  { id: "showcase-1", img: "Images/Coursel/Bridal.jpg.png", title: "Bridal Glow Facial Kit", category: "Facial Kit", enabled: true },
  { id: "showcase-2", img: "Images/Coursel/Pearl.png", title: "Pearl Radiance Kit", category: "Facial Kit", enabled: true },
  { id: "showcase-3", img: "Images/Coursel/Diamond.png", title: "Crystal Diamond Kit", category: "Facial Kit", enabled: true },
  { id: "showcase-4", img: "Images/Coursel/Red Wine.png", title: "Red Wine Facial Kit", category: "Facial Kit", enabled: true },
  { id: "showcase-5", img: "Images/Coursel/Green Tea.png", title: "Green Tea Detox Kit", category: "Facial Kit", enabled: true },
  { id: "showcase-6", img: "Images/Coursel/Papaya.png", title: "Papaya Blemish Care Kit", category: "Facial Kit", enabled: true },
  { id: "showcase-7", img: "Images/Coursel/Whitening.png", title: "Ultra Whitening Kit", category: "Facial Kit", enabled: true },
  { id: "showcase-8", img: "Images/Coursel/Vitamin C.png", title: "Vitamin C Brightening Kit", category: "Facial Kit", enabled: true },
  { id: "showcase-9", img: "Images/Coursel/Dandruff.png", title: "Anti Dandruff Kit", category: "Facial Kit", enabled: true },
  { id: "showcase-10", img: "Images/Coursel/Nanoplastia.png", title: "Nano Plastia Kit", category: "Facial Kit", enabled: true },
  { id: "showcase-11", img: "Images/Coursel/Fruit.png", title: "Fruit Extracts Revitalizing Kit", category: "Facial Kit", enabled: true },
  { id: "showcase-12", img: "Images/Coursel/AntiA.png", title: "Anti-Aging Facial Kit", category: "Facial Kit", enabled: true },
  { id: "showcase-13", img: "Images/Coursel/Keratin.png", title: "Keratin Treatment", category: "Hair Treatment", enabled: true },
  { id: "showcase-14", img: "Images/Coursel/Hairspa.png", title: "HairSpa Treatment", category: "Hair Treatment", enabled: true },
  { id: "showcase-15", img: "Images/Coursel/Botox.png", title: "Botox Treatment", category: "Hair Treatment", enabled: true },

];

// ─── Data Sync Engine (Local Database Integration) ────────────────────────────
function loadSyncedSiteConfig() {
  try {
    const saved = localStorage.getItem('admin_site_config');
    if (saved) {
      return { ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not load stored site config', e);
  }
  return { ...DEFAULT_SITE_CONFIG };
}

function loadSyncedBannerSlides() {
  try {
    const saved = localStorage.getItem('admin_banners');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Upgrade stale legacy banner reference if present
        if (parsed[0] && (parsed[0].image === 'Images/Banner.png' || parsed[0].image === 'Images/banner.png')) {
          parsed[0].image = 'Images/Banner1.png';
          parsed[0].title = '';
          parsed[0].desc = '';
          localStorage.setItem('admin_banners', JSON.stringify(parsed));
        }
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not load stored banner slides', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_BANNER_SLIDES));
}

function loadSyncedShowcaseSlides() {
  try {
    const saved = localStorage.getItem('admin_showcase_slides');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Could not load stored showcase slides', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_SHOWCASE_SLIDES));
}

// Active global objects accessed by the entire website
let SITE_CONFIG = loadSyncedSiteConfig();
let BANNER_SLIDES = loadSyncedBannerSlides();
let SHOWCASE_SLIDES = loadSyncedShowcaseSlides();

// Helper Getters that return only enabled items for public display
function getActiveBannerSlides() {
  const slides = loadSyncedBannerSlides();
  const enabled = slides.filter(s => s.enabled !== false);
  return enabled.length > 0 ? enabled : slides;
}

function getActiveShowcaseSlides() {
  const slides = loadSyncedShowcaseSlides();
  const enabled = slides.filter(s => s.enabled !== false);
  return enabled.length > 0 ? enabled : slides;
}

function getActiveSiteConfig() {
  return loadSyncedSiteConfig();
}

// Global refresher
function refreshGlobalConfig() {
  SITE_CONFIG = loadSyncedSiteConfig();
  BANNER_SLIDES = loadSyncedBannerSlides();
  SHOWCASE_SLIDES = loadSyncedShowcaseSlides();
}
