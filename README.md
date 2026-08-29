# Aroma Signature+ — Premium E-Commerce Website

A premium, elegant, modern Indian beauty and personal-care brand website built with **HTML5, CSS3, and Vanilla JavaScript**. Deployable directly to GoDaddy static hosting.

---

## 🛠️ Maintenance & Easy Editing Guide

This website is designed to be **extremely easy to update** without touching complex code or multiple HTML files.

### 1. How to Update Business / Company Details
Edit `js/config.js`:
- Change Phone, Email, WhatsApp number
- Update Social Media links (Instagram, Facebook, YouTube)
- Change Announcement text top bar (`"FREE DELIVERY ON ONLINE ORDERS"`)
- Update delivery details

### 2. How to Add, Edit, or Delete Products
Edit `js/products.js`:
- To **add** a product: Add a new object entry to the `PRODUCTS_DATA` array.
- To **edit** a product: Update price, name, description, images, or rating in `js/products.js`.
- To **delete** a product: Remove its object from `PRODUCTS_DATA`.
- Any product added or edited in `js/products.js` will automatically reflect across the Shop, categories, search, and detail pages.

---

## 📁 File Structure

```
/
├── index.html
├── shop.html
├── product.html
├── about.html
├── contact.html
├── offers.html
│
├── categories/
│   ├── skin-care.html
│   ├── facial-kits.html
│   ├── hair-care.html
│   ├── hair-treatment.html
│   └── self-care.html
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── components.css
│
├── js/
│   ├── config.js
│   ├── products.js
│   ├── components.js
│   ├── shop.js
│   ├── product.js
│   ├── whatsapp.js
│   └── main.js
│
├── Images/
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## 🚀 Deployment Instructions (GoDaddy Static Hosting)

1. Upload all files and folders as structured above to the `public_html` directory of your GoDaddy web hosting server.
2. The website will work immediately with 0 backend dependencies or database configurations required.
