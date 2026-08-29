// =============================================================================
// AROMA SIGNATURE+ — PRODUCT CATALOG DATA
// =============================================================================
//
// ✏️  ADD / EDIT / REMOVE PRODUCTS HERE
//
// Every product added here will automatically appear in the Shop and relevant categories.
// If you remove a product from this array, it will automatically disappear from the site.
//
// Product Fields:
// - id: Unique string identifier (slug)
// - name: Full product title
// - category: Category ID ("skin-care", "facial-kits", "hair-care", "hair-treatment", "self-care")
// - description: Short summary shown on product card
// - fullDescription: Comprehensive product details shown on single product page
// - images: Array of image paths (first image is primary view)
// - price: Current selling price (number)
// - oldPrice: Genuine original price for display (number or null)
// - rating: Star rating (1-5)
// - reviewCount: Number of customer reviews
// - packs: Array of pack sizes/variants e.g. ["100ml", "250ml", "500ml"]
// - concerns: Array of targeted concerns e.g. ["Dullness", "Tan Removal", "Anti-Aging"]
// - productType: Type e.g. "Facial Kit", "Face Wash", "Shampoo", "Treatment Kit"
// - details: Object with key specs (ingredients, how to use, skin type)
// - isBestSeller: boolean (true/false)
// - isFeatured: boolean (true/false)
// - isNew: boolean (true/false)
//
// =============================================================================

let PRODUCTS_DATA = [

  //BRIDAL FACIAL KIT//
  {
    "id": "bridal-facial-kit",
    "name": "Aroma Signature+ Bridal Glow Facial Kit",
    "category": "facial-kits",
    "description": " The Bridal Facial Kit enhances skin radiance, evens out skin tone, deeply nourishes and hydrates the skin, improves smoothness, and delivers a luminous, long-lasting bridal glow for a flawless, wedding-ready complexion.",
    "fullDescription": "Bridal Facial Kit. Indulge in timeless bridal skincare with the Aroma Signature+ Bridal Facial Kit, a luxurious multi-step facial enriched with Manjistha, Saffron (Kesar), and Sandalwood Powder to reveal a naturally radiant, wedding-ready complexion. Manjistha helps enhance skin clarity and promotes an even-looking tone, Saffron revives dull skin with a luminous glow, while Sandalwood Powder soothes and refreshes the skin for a soft, smooth finish. Crafted to deeply nourish and hydrate, this salon-inspired facial leaves your skin looking bright, refreshed, and beautifully glowing for weddings, engagements, and every special celebration.",
    "images": [
      "Images/F-bridal.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.9,
    "reviewCount": 142,
    "packs": [
      "Single Use Kit (6 Step)",
      "Salon Pack- 6 Facials (7 Step)",
      "Salon Luxury Pack- 12 Facials (7 Step)",
      "Eco Pack- 24 Facials"
    ],
    "packPrices": [
      350,
      1600,
      2500,
      4800
    ],
    "concerns": [
      "Pre-Wedding Skincare",
      "Uneven Complexion",
      "Tired-Looking Skin",
      "Dull Complexionl",
      "Bridal Glow Preparation",
      "Special Occasion Skincare"
    ],
    "productType": "Facial Kit",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "Manjishtha, Lactic Acid, Demineralized Water, Glycerin, Kesar Extract, Tulsi Extract, Allantoin, Sodium Benzoate, Phenoxyethanol, Stearic Acid, Cetyl Alcohol, Isopropyl Myristate, Zinc Oxide, Mint Extract, Camphor, Eucalyptus Oil, Manjishtha Extract, Walnut Shell Scrub, Kojic Acid, Shea Butter, Lanolin, Myristic Acid, Gold Dust, Niacinamide, Vitamin E, Papaya Extract, Aloe Vera Gel, Sandalwood, Citrus Aurantium Bark Powder, Gum Acacia, IPM (Isopropyl Myristate), Hyaluronic Acid, Aloe Vera Extract, Vitamin E Acetate, Green Tea Extract, Fragrance.",
      "howToUse": "Follow the 6-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack.<br>Follow the 7-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack -> Serum. Our Special De Tan Pack Include all the Pack of Facial Kit",
      "benefits": "Instant glow, Skin Whitening, Deep Nourishment, Pigmentation Care, Skin Polishing, Long-Lasting Glow, Dullness Revival, ."
    },
    "isBestSeller": true,
    "isFeatured": true,
    "isNew": false
  },

  //////////////////////////////////////////VITAMIN C FACIAL KIT//////////////////////////////////////////////////////////////
  {
    "id": "vitaminc-facial-kit",
    "name": "Aroma Signature+ Vitamin C Facial Kit",
    "category": "facial-kits",
    "description": "Aroma Signature+ Vitamin C Facial Kit helps brighten dull skin, support collagen production for firmer-looking skin, reduce the appearance of dark spots and pigmentation, protect against environmental stressors with powerful antioxidants, and provide deep hydration for a radiant, smooth, and youthful-looking glow.",
    "fullDescription": "Reveal brighter, smoother, and more radiant-looking skin with the Aroma Signature+ Vitamin C Facial Kit. Enriched with Vitamin C, botanical extracts, and powerful antioxidants, this premium multi-step facial helps reduce the appearance of dark spots, pigmentation, and uneven skin tone while supporting collagen production for firmer-looking skin. It deeply hydrates, revitalizes dull and tired-looking skin, and helps protect against environmental stressors, leaving your complexion refreshed with a healthy, salon-like glow after every use. Perfect for regular skincare and special occasions alike.",
    "images": [
      "Images/F-vitaminc.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.9,
    "reviewCount": 142,
    "packs": [
      "Single Use Kit (6 Step)",
      "Salon Pack- 6 Facials (7 Step)",
      "Salon Luxury Pack- 12 Facials (7 Step)",
      "Eco Pack- 24 Facials"
    ],
    "packPrices": [
      350,
      1600,
      2500,
      4800
    ],
    "concerns": [
      "Uneven Complexion",
      "Tired-Looking Skin",
      "Dull Complexionl",
      "Acne Skin",
      "Pigmented Skin"
    ],
    "productType": "Facial Kit",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "Vitamin C, Orange Extract, Licorice Extract, Vitamin E",
      "howToUse": "Follow the 6-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack.<br>Follow the 7-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack -> Serum. Our Special De Tan Pack Include all the Pack of Facial Kit",
      "benefits": "Brightens skin, Skin Whitening, Lighten Hyperpigmentation, Reduce Acne Mark, Boosts Collagen, Dullness Revival."
    },
    "isBestSeller": true,
    "isFeatured": true,
    "isNew": false
  },

  //////////////////////////////////SKIN WHITENING FACIAL KIT///////////////////////////////////////////////////////////////////
  {
    "id": "whitening-facial-kit",
    "name": "Aroma Signature+ Skin Whitening Facial Kit",
    "category": "facial-kits",
    "description": " Whitening Facial Kit. Enriched with Saffron, Sandalwood, Multani Mitti, Niacinamide, Alpha Arbutin, and Licorice, this premium facial helps brighten dull skin, reduce the appearance of dark spots, even out skin tone, and reveal a naturally radiant complexion.",
    "fullDescription": "Whitening Facial Kit. Achieve a brighter, more even-looking complexion with the Aroma Signature+ Whitening Facial Kit. Enriched with Saffron, Sandalwood, Multani Mitti, Niacinamide, Alpha Arbutin, and Licorice, this premium multi-step facial helps reduce the appearance of dark spots, improve uneven skin tone, and promote a naturally radiant glow. It gently exfoliates, deeply nourishes, and helps minimize the appearance of excess melanin for smoother, refreshed, and luminous-looking skin after every use.",
    "images": [
      "Images/F-whitening.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.9,
    "reviewCount": 142,
    "packs": [
      "Single Use Kit (6 Step)",
      "Salon Pack- 6 Facials (7 Step)",
      "Salon Luxury Pack- 12 Facials (7 Step)",
      "Eco Pack- 24 Facials"
    ],
    "packPrices": [
      350,
      1600,
      2500,
      4800
    ],
    "concerns": [
      "Brightening & Whitening Care",
      "Uneven Complexion",
      "Pre-Event Glow",
      "Dull Complexionl",
      "Pigmentation",

    ],
    "productType": "Facial Kit",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "Saffron, Sandalwood, Multani Mitti, Niacinamide, Alpha Arbutin, Demineralized Water, Glycerin, Kesar Extract, Tulsi Extract, Allantoin, Stearic Acid, Cetyl Alcohol, Isopropyl Myristate, Zinc Oxide, Mint Extract, Camphor, Eucalyptus Oil, Walnut Shell, Vitamin E, Borax, Emulsifying Wax, Triethanolamine (TEA), Lanolin, Castor Seed Oil, Shea Butter, Myristic Acid, Carbopol 940, Aloe Vera Gel, Light Kaolin Clay, Yashad Bhasma (Zinc Compound), Gum Acacia, IPM (Isopropyl Myristate), Niacinamide, Hyaluronic Acid, Aloe Vera Extract, Vitamin E Acetate, Green Tea Extract.",
      "howToUse": "Follow the 6-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack.<br>Follow the 7-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack -> Serum. Our Special De Tan Pack Include all the Pack of Facial Kit",
      "benefits": "Instant glow, Skin Whitening, Deep Nourishment, Pigmentation Care, Skin Polishing, Long-Lasting Glow, Dullness Revival, ."
    },
    "isBestSeller": true,
    "isFeatured": true,
    "isNew": false
  },

  ////////////////////////////////////////DIAMOND FACIAL KIT////////////////////////////////////////////////////////////////////////
  {
    "id": "diamond-facial-kit",
    "name": "Aroma Signature+ Crystal Diamond Facial Kit",
    "category": "facial-kits",
    "description": "Enhance your skin's radiance and reveal a naturally glowing complexion.",
    "fullDescription": "Diamond Facial Kit. Achieve a brighter, more even-looking complexion with the Aroma Signature+ Diamond Facial Kit. Enriched with Pearl Extract, Niacinamide, Aloe Vera, and Vitamin E, this premium multi-step facial helps reduce the appearance of dark spots, improve uneven skin tone, and promote a naturally radiant glow. It gently exfoliates, deeply nourishes, and helps minimize the appearance of excess melanin for smoother, refreshed, and luminous-looking skin after every use.",
    "images": [
      "Images/F-diamond.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.9,
    "reviewCount": 142,
    "packs": [
      "Single Use Kit (6 Step)",
      "Salon Pack- 6 Facials (7 Step)",
      "Salon Luxury Pack- 12 Facials (7 Step)",
      "Eco Pack- 24 Facials"
    ],
    "packPrices": [
      350,
      1600,
      2500,
      4800
    ],
    "concerns": [
      "Radiance & Glow Care",
      "Uneven Complexion",
      "Rough Texture",
      "Dull Complexionl",
      "Clogged Pores",
      "Dark Spots"
    ],
    "productType": "Facial Kit",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "Diamond Dust, Demineralized Water, Glycerin, Tulsi Extract, Allantoin, Zinc Oxide, Mint Extract, Camphor, Eucalyptus Oil, Cellulose Scrub Beads, Borax, Stearic Acid, Emulsifying Wax, Triethanolamine (TEA), Lanolin, Castor Seed Oil, Alpha Hydroxy Acid (AHA), Triclosan, Carbopol 940, Neem Extract, Light Kaolin Clay, Yashad Bhasma (Zinc Compound), Hyaluronic Acid, Cetyl Alcohol, IPM (Isopropyl Myristate), Orange Extract, Niacinamide, Aloe Vera Extract, Vitamin E Acetate, Green Tea Extract.",
      "howToUse": "Follow the 6-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack.<br>Follow the 7-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack -> Serum. Our Special De Tan Pack Include all the Pack of Facial Kit",
      "benefits": "Radiance Enhancement, Pore Purifying, Exfoliation, Deep Nourishment, Crystal Glow, Skin Polishing, Long-Lasting Glow, Dullness Revival,  ."
    },
    "isBestSeller": true,
    "isFeatured": true,
    "isNew": false
  },

  ////////////////////////////////////////PEARL FACIAL KIT////////////////////////////////////////////////////////////////////////
  {
    "id": "pearl-facial-kit",
    "name": "Aroma Signature+ Pearl Facial Kit",
    "category": "facial-kits",
    "description": "Pearl Facial Kit. Enriched with Pearl Extract, Niacinamide, Aloe Vera, and Vitamin E, this premium facial helps brighten dull skin, improve uneven skin tone, and enhance your skin's natural luminosity. It deeply nourishes, refines skin texture, and leaves your complexion looking smooth, fresh, and radiant.",
    "fullDescription": "Pearl Facial Kit. Reveal a naturally radiant and luminous complexion with the Aroma Signature+ Pearl Facial Kit. Enriched with Pearl Extract, Niacinamide, Aloe Vera, and Vitamin E, this premium multi-step facial helps reduce the appearance of dark spots, improve uneven skin tone, and enhance your skin's natural glow. It gently exfoliates, deeply nourishes, and refines skin texture for a smooth, refreshed, and youthful-looking complexion after every use. Perfect for regular skincare and special occasions alike.",
    "images": [
      "Images/F-pearl.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "Single Use Kit (6 Step)",
      "Salon Pack- 6 Facials (7 Step)",
      "Salon Luxury Pack- 12 Facials (7 Step)",
      "Eco Pack- 24 Facials"
    ],
    "packPrices": [
      350,
      1600,
      2500,
      4800
    ],
    "concerns": [
      "Brightening Care",
      "Enhance Pearl Radiance",
      "Uneven Complexion",
      "Pre-Event Glow",
      "Dull Complexionl",
      "Dark Spots"
    ],
    "productType": "Facial Kit",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "Pearl Extract, Niacinamide, Aloe Vera, Vitamin E, Demineralized Water, Glycerin, Kesar Extract, Tulsi Extract, Allantoin, Stearic Acid, Cetyl Alcohol, Isopropyl Myristate, Zinc Oxide, Mint Extract, Camphor, Eucalyptus Oil, Walnut Shell, Borax, Emulsifying Wax, Triethanolamine (TEA), Lanolin, Castor Seed Oil, Shea Butter, Myristic Acid, Carbopol 940, Aloe Vera Gel, Light Kaolin Clay, Yashad Bhasma (Zinc Compound), Gum Acacia, IPM (Isopropyl Myristate), Niacinamide, Hyaluronic Acid, Aloe Vera Extract, Vitamin E Acetate, Green Tea Extract.",
      "howToUse": "Follow the 6-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack.<br>Follow the 7-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack -> Serum. Our Special De Tan Pack Include all the Pack of Facial Kit",
      "benefits": "Radiance glow, fade darkspots, Skin Whitening, Deep Nourishment, Skin Polishing, Long-Lasting Glow, Dullness Revival, ."
    },
    "isBestSeller": false,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////RED WINE FACIAL KIT////////////////////////////////////////////////////////////////////////
  {
    "id": "redwine-facial-kit",
    "name": "Aroma Signature+ Red Wine Facial Kit",
    "category": "facial-kits",
    "description": "Red Wine Facial Kit. Enriched with Red Wine Extract, Niacinamide, Aloe Vera, and Vitamin E, this premium facial helps brighten dull skin, improve uneven skin tone, and enhance your skin's natural luminosity. It deeply nourishes, refines skin texture, and leaves your complexion looking smooth, fresh, and radiant.",
    "fullDescription": "Red Wine Facial Kit. Reveal a naturally radiant and luminous complexion with the Aroma Signature+ Red Wine Facial Kit. Enriched with Red Wine Extract, Niacinamide, Aloe Vera, and Vitamin E, this premium multi-step facial helps reduce the appearance of dark spots, improve uneven skin tone, and enhance your skin's natural glow. It gently exfoliates, deeply nourishes, and refines skin texture for a smooth, refreshed, and youthful-looking complexion after every use. Perfect for regular skincare and special occasions alike.",
    "images": [
      "Images/F-redwine.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "Single Use Kit (6 Step)",
      "Salon Pack- 6 Facials (7 Step)",
      "Salon Luxury Pack- 12 Facials (7 Step)",
      "Eco Pack- 24 Facials"
    ],
    "packPrices": [
      350,
      1600,
      2500,
      4800
    ],
    "concerns": [
      "Premature Aging",
      "Fine Lines & Wrinkles",
      "Uneven Complexion",
      "Mature Skin",
      "Dull Complexionl",
      "Environmental Stress",
      "Dark Spots"
    ],
    "productType": "Facial Kit",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "Grape Seed Extract, Orange Extract, Tulsi Extract, Allantoin, Glycerin, Castor Seed Oil, Shea Butter, Walnut Shell, Light Kaolin, Yashad, Zinc Oxide, Titanium Dioxide, Mint Extract, Eucalyptus Oil, Camphor, Lanolin, Stearic Acid, Cetyl Alcohol, Myristate (IPM), Gum Acacia. ",
      "howToUse": "Follow the 6-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack.<br>Follow the 7-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack -> Serum. Our Special De Tan Pack Include all the Pack of Facial Kit",
      "benefits": "Anti-Aging, Youthful Radiance, Detoxification, Collagen Support, Antioxidant Defense, Hydration, Long-Lasting Glow, Dullness Revival ."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////ANTI AGEING FACIAL KIT////////////////////////////////////////////////////////////////////////
  {
    "id": "antiageing-facial-kit",
    "name": "Aroma Signature+ Anti Ageing Facial Kit",
    "category": "facial-kits",
    "description": "Anti-Ageing Facial Kit. Enriched with Anti-Ageing Ingredients, this premium facial helps reduce the appearance of fine lines and wrinkles, improve skin elasticity, and enhance your skin's natural luminosity. It deeply nourishes, refines skin texture, and leaves your complexion looking smooth, fresh, and radiant.",
    "fullDescription": "Anti-Ageing Facial Kit. Reveal a naturally radiant and luminous complexion with the Aroma Signature+ Anti-Ageing Facial Kit. Enriched with Anti-Ageing Ingredients, this premium multi-step facial helps reduce the appearance of fine lines and wrinkles, improve skin elasticity, and enhance your skin's natural glow. It gently exfoliates, deeply nourishes, and refines skin texture for a smooth, refreshed, and youthful-looking complexion after every use. Perfect for regular skincare and special occasions alike.",
    "images": [
      "Images/F-Anti.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "Single Use Kit (6 Step)",
      "Salon Pack- 6 Facials (7 Step)",
      "Salon Luxury Pack- 12 Facials (7 Step)",
      "Eco Pack- 24 Facials"
    ],
    "packPrices": [
      350,
      1600,
      2500,
      4800
    ],
    "concerns": [
      "Premature Aging",
      "Fine Lines & Wrinkles",
      "Uneven Complexion",
      "Mature Skin",
      "Dull Complexionl",
      "Environmental Stress",
      "Dark Spots"
    ],
    "productType": "Facial Kit",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": " Retinol, Peptides, Vitamin C, Vitamin E, Hyaluronic Acid, Niacinamide, Collagen, Coenzyme Q10, Green Tea Extract, Grape Seed Extract, Rosehip Extract, Aloe Vera, Squalane, Ceramides, Alpha Hydroxy Acids (AHA) ",
      "howToUse": "Follow the 6-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack.<br>Follow the 7-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack -> Serum. Our Special De Tan Pack Include all the Pack of Facial Kit",
      "benefits": "Anti-Aging, Youthful Radiance, Detoxification, Collagen Support, Antioxidant Defense, Hydration, Long-Lasting Glow, Dullness Revival ."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////GREEN TEA FACIAL KIT////////////////////////////////////////////////////////////////////////
  {
    "id": "green-tea-facial-kit",
    "name": "Aroma Signature+ Green Tea Facial Kit",
    "category": "facial-kits",
    "description": "Green Tea Facial Kit. Enriched with Green Tea Extract, this premium facial helps reduce the appearance of fine lines and wrinkles, improve skin elasticity, and enhance your skin's natural luminosity. It deeply nourishes, refines skin texture, and leaves your complexion looking smooth, fresh, and radiant.",
    "fullDescription": "Green Tea Facial Kit. Reveal a naturally radiant and luminous complexion with the Aroma Signature+ Green Tea Facial Kit. Enriched with Green Tea Extract, this premium multi-step facial helps reduce the appearance of fine lines and wrinkles, improve skin elasticity, and enhance your skin's natural glow. It gently exfoliates, deeply nourishes, and refines skin texture for a smooth, refreshed, and youthful-looking complexion after every use. Perfect for regular skincare and special occasions alike.",
    "images": [
      "Images/F-greentea.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "Single Use Kit (6 Step)",
      "Salon Pack- 6 Facials (7 Step)",
      "Salon Luxury Pack- 12 Facials (7 Step)",
      "Eco Pack- 24 Facials"
    ],
    "packPrices": [
      350,
      1600,
      2500,
      4800
    ],
    "concerns": [
      "Excess Oil",
      "Acne-Prone Skin",
      "Enlarged Pores",
      "Skin Congestion",
      "Pollution-Exposed Skin",
      "Environmental Stress",
      "Post-Sun Refresh"
    ],
    "productType": "Facial Kit",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "Green Tea Extract, Demineralized Water, Glycerin, Kesar Extract, Tulsi Extract, Allantoin, Stearic Acid, Cetyl Alcohol, Isopropyl Myristate, Zinc Oxide, Mint Extract, Camphor, Eucalyptus Oil, Walnut Shell, Borax, Emulsifying Wax, Triethanolamine (TEA), Lanolin, Castor Seed Oil, Shea Butter, Myristic Acid, Carbopol 940, Aloe Vera Gel, Light Kaolin Clay, Yashad Bhasma (Zinc Compound), Gum Acacia, IPM (Isopropyl Myristate), Niacinamide, Hyaluronic Acid, Aloe Vera Extract, Vitamin E Acetate, Green Tea Extract.",
      "howToUse": "Follow the 6-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack.<br>Follow the 7-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack -> Serum. Our Special De Tan Pack Include all the Pack of Facial Kit",
      "benefits": "Anti Acne, Antioxidant Protection, Oil Control, Pore Refining, Skin Soothing, Pollution Defense, Hydration, Skin Refreshing, Texture Refining, Radiance Boost, Skin Revitalization."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////PAPAYA FACIAL KIT////////////////////////////////////////////////////////////////////////
  {
    "id": "papaya-facial-kit",
    "name": "Aroma Signature+ Papaya Facial Kit",
    "category": "facial-kits",
    "description": "Papaya Facial Kit. Enriched with Papaya Extract, this premium facial helps reduce the appearance of fine lines and wrinkles, improve skin elasticity, and enhance your skin's natural luminosity. It deeply nourishes, refines skin texture, and leaves your complexion looking smooth, fresh, and radiant.",
    "fullDescription": "Papaya Facial Kit. Reveal a naturally radiant and luminous complexion with the Aroma Signature+ Papaya Facial Kit. Enriched with Papaya Extract, this premium multi-step facial helps reduce the appearance of fine lines and wrinkles, improve skin elasticity, and enhance your skin's natural glow. It gently exfoliates, deeply nourishes, and refines skin texture for a smooth, refreshed, and youthful-looking complexion after every use. Perfect for regular skincare and special occasions alike.",
    "images": [
      "Images/F-papaya.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "Single Use Kit (6 Step)",
      "Salon Pack- 6 Facials (7 Step)",
      "Salon Luxury Pack- 12 Facials (7 Step)",
      "Eco Pack- 24 Facials"
    ],
    "packPrices": [
      350,
      1600,
      2500,
      4800
    ],
    "concerns": [
      "Hyperpigmentation",
      "Post-Acne Marks",
      "Sun-Exposed Skin",
      "Uneven Complexion",
      "Dead Skin Build-Up",
      "Congested Skin",
      "Post-Sun Refresh",
      "Dull & Tired Skin"
    ],
    "productType": "Facial Kit",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "Papaya Extract, Papain Enzymes, Pineapple Extract, Lemon Extract, Orange Extract, Aloe Vera Extract, Niacinamide, Vitamin E, Hyaluronic Acid, Green Tea Extract, Glycerin, Allantoin, Tulsi Extract, Kesar Extract, Walnut Shell.",
      "howToUse": "Follow the 6-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack.<br>Follow the 7-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack -> Serum. Our Special De Tan Pack Include all the Pack of Facial Kit",
      "benefits": "Gentle Exfoliation, Tan Reduction, Dark Spot Fading, Hyperpigmentation Care, Skin Renewal, Dead Cell Removal, Texture Refinement, Brightening, Even-Tone Enhancement, Oil Balance, Pore Cleansing, Skin Softening, Hydration, Freshness Boost, Natural Radiance, Healthy-Looking Glow."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////DE TAN FACIAL KIT////////////////////////////////////////////////////////////////////////
  {
    "id": "de-tan-facial-kit",
    "name": "Aroma Signature+ De Tan Facial Kit",
    "category": "facial-kits",
    "description": "De-Tan Facial Kit. Enriched with Sunflower Extract and skin-loving botanical ingredients, this facial helps reduce the appearance of sun tan, refresh sun-exposed skin, and restore a brighter, more even-looking complexion.",
    "fullDescription": "De-Tan Facial Kit. Specially designed for sun-exposed and tanned skin, this premium multi-step facial helps gently exfoliate dead skin cells, reduce the appearance of stubborn tan and uneven pigmentation, and revive dull-looking skin. Enriched with Sunflower Extract, Aloe Vera, Vitamin E, Licorice, and botanical extracts, it helps nourish, hydrate, and soothe the skin while restoring its natural brightness. With regular care, it leaves the complexion looking smoother, fresher, more even-toned, and naturally radiant.",
    "images": [
      "Images/F-detan.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "Single Use Kit (6 Step)",
      "Salon Pack- 6 Facials (7 Step)",
      "Salon Luxury Pack- 12 Facials (7 Step)",
      "Eco Pack- 24 Facials"
    ],
    "packPrices": [
      350,
      1600,
      2500,
      4800
    ],
    "concerns": [
      "Stubborn Sun Tan",
      "Sun-Exposed Skin",
      "Uneven Tan Lines",
      "Post-Sun Dullness",
      "Sun-Induced Uneven Tone",
      "Outdoor Exposure",
      "Post-Sun Refresh",
      "Dull & Tired Skin"
    ],
    "productType": "Facial Kit",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "Sunflower Extract, Aloe Vera Extract, Vitamin E, Licorice Extract, Papaya Extract, Lemon Extract, Green Tea Extract, Niacinamide, Glycerin, Allantoin, Cucumber Extract, Saffron Extract, Hyaluronic Acid.",
      "howToUse": "Follow the 6-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack.<br>Follow the 7-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack -> Serum. Our Special De Tan Pack Include all the Pack of Facial Kit",
      "benefits": "Tan Reduction, Sun Damage Repair, Skin Brightening, Even-Tone Enhancement, Hydration, Soothing & Calming, Skin Renewal, Texture Refinement, Natural Radiance, Healthy-Looking Glow."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////FRUIT FACIAL KIT////////////////////////////////////////////////////////////////////////
  {
    "id": "fruit-facial-kit",
    "name": "Aroma Signature+ Mix Fruit Facial Kit",
    "category": "facial-kits",
    "description": "Mix Fruit Facial Kit. Enriched with a blend of fruit extracts, this premium facial helps brighten dull skin, improve uneven skin tone, and enhance your skin's natural luminosity. It deeply nourishes, refines skin texture, and leaves your complexion looking smooth, fresh, and radiant.",
    "fullDescription": "Fruit Facial Kit. Revitalize your skin with the goodness of natural fruit extracts, vitamins, and antioxidants. This premium multi-step facial gently exfoliates dead skin cells, deeply nourishes the skin, and helps brighten dull-looking skin while improving uneven skin tone. Infused with fruit enzymes that refresh and rejuvenate, it leaves your complexion soft, smooth, and naturally radiant.",
    "images": [
      "Images/F-fruit.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "Single Use Kit (6 Step)",
      "Salon Pack- 6 Facials (7 Step)",
      "Salon Luxury Pack- 12 Facials (7 Step)",
      "Eco Pack- 24 Facials"
    ],
    "packPrices": [
      350,
      1600,
      2500,
      4800
    ],
    "concerns": [
      "Dehydrated Skin",
      "Natural Brightening",
      "Sun Damage Repair",
      "Uneven Complexion",
      "Rough Texture",
      "Daily Glow Care",
      "Dull Skin",
      "Pre-Event Glow"
    ],
    "productType": "Facial Kit",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "Papaya Extract, Pineapple Extract, Orange Extract, Lemon Extract, Strawberry Extract, Apple Extract,Grape Extract, Watermelon Extract, Banana Extract, Aloe Vera, Vitamin C, Vitamin E, Green Tea Extract, Hyaluronic Acid, Niacinamide, Glycerin, Allantoin, Tulsi Extract, Kesar Extract, Walnut Shell.",
      "howToUse": "Follow the 6-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack.<br>Follow the 7-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack -> Serum. Our Special De Tan Pack Include all the Pack of Facial Kit",
      "benefits": "Gentle Exfoliation, Skin Brightening, Even-Tone Enhancement, Hydration, Soothing & Calming, Skin Renewal, Texture Refinement, Natural Radiance, Healthy-Looking Glow."
    },
    "isBestSeller": true,
    "isFeatured": true,
    "isNew": false
  },

  ////////////////////////////////////////GOLD FACIAL KIT////////////////////////////////////////////////////////////////////////
  {
    "id": "gold-facial-kit",
    "name": "Aroma Signature+ Gold Facial Kit",
    "category": "facial-kits",
    "description": "Gold Facial Kit. Enriched with 24K Gold Dust, Saffron, and Vitamin E, this luxurious facial helps brighten dull-looking skin, enhance radiance, smooth skin texture, and reveal a luminous, youthful-looking complexion.",
    "fullDescription": "Gold Facial Kit. Experience luxurious skincare with the Aroma Signature+ Gold Facial Kit, enriched with 24K Gold Dust, Saffron, Almond Oil, and Vitamin E. This premium multi-step facial gently cleanses, exfoliates, nourishes, and revitalizes the skin while helping improve the appearance of dullness, uneven tone, and fine lines. It leaves the skin feeling soft, smooth, hydrated, and beautifully radiant with a refined golden glow.",
    "images": [
      "Images/F-gold.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "Single Use Kit (6 Step)",
      "Salon Pack- 6 Facials (7 Step)",
      "Salon Luxury Pack- 12 Facials (7 Step)",
      "Eco Pack- 24 Facials"
    ],
    "packPrices": [
      350,
      1600,
      2500,
      4800
    ],
    "concerns": [
      "Loss of Radiance",
      "Fine Lines & Wrinkles",
      "Mature-Looking Skin",
      "Uneven Complexion",
      "Rough Texture",
      "Daily Glow Care",
      "Dull Skin",
      "Pre-Event Glow"
    ],
    "productType": "Facial Kit",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "24K Gold Dust, Saffron Extract, Almond Oil, Vitamin E, Aloe Vera Extract, Honey, Shea Butter, Licorice Extract, Green Tea Extract, Glycerin, Allantoin, Sandalwood Extract, Rose Extract, Niacinamide, Hyaluronic Acid.",
      "howToUse": "Follow the 6-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack.<br>Follow the 7-step process: Cleanser -> De Tan Pack -> Scrub -> Cream -> Gel -> Face Pack -> Serum. Our Special De Tan Pack Include all the Pack of Facial Kit",
      "benefits": "Radiance Boost, Brightening, Fine Line Care, Skin Firming, Deep Nourishment, Hydration, Texture Refinement, Skin Revitalization, Youthful Glow, Golden Radiance."
    },
    "isBestSeller": false,
    "isFeatured": true,
    "isNew": false
  },
  ////////////////////////////////////////GOLD FACE WASH////////////////////////////////////////////////////////////////////////
  {
    "id": "skin-whitening-facewash",
    "name": "Aroma Signature+ Skin Whitening Facewash",
    "category": "self-care",
    "description": "This skin whitening facewash helps brighten dull-looking skin, enhance radiance, smooth skin texture, and reveal a luminous, youthful-looking complexion.",
    "fullDescription": "This skin whitening facewash revitalizes the skin while helping improve the appearance of dullness, uneven tone, and fine lines. It leaves the skin feeling soft, smooth, hydrated, and beautifully radiant with a refined golden glow.",
    "images": [
      "Images/fw-whitening.jpg",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "60ml",
      "120ml"
    ],
    "packPrices": [
      125,
      195
    ],
    "concerns": [
      "Uneven Skin Tone",
      "Dark Spots",
      "Hyperpigmentation",
      "Tanned Skin",
      "Loss of Radiance",
    ],
    "productType": "Facewash",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": " Alpha Arbutin, Niacinamide, Vitamin C, Licorice Extract, Glutathione, Vitamin E, Aloe Vera.",
      "howToUse": "Wet your face with water and apply a small amount of face wash. Gently massage in circular motions for 1–2 minutes, then rinse thoroughly with clean water. Use twice daily for best results.",
      "benefits": "Radiance Boost, Brightening, Fine Line Care, Skin Firming, Deep Nourishment, Hydration, Texture Refinement, Skin Revitalization, Youthful Glow, Golden Radiance."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////VITAMIN C FACE WASH////////////////////////////////////////////////////////////////////////
  {
    "id": "vitaminc-facewash",
    "name": "Aroma Signature+ Vitamin C Facewash",
    "category": "self-care",
    "description": "Vitamin C Face Wash. Enriched with Vitamin C, this refreshing face wash gently cleanses impurities, helps brighten dull-looking skin, and reveals a fresh, radiant complexion.",
    "fullDescription": "This Vitamin C face wash revitalizes the skin while helping improve the appearance of dullness, uneven tone, and fine lines. It leaves the skin feeling soft, smooth, hydrated, and beautifully radiant with a refined golden glow.",
    "images": [
      "Images/fw-vitaminc.jpg",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "60ml",
      "120ml"
    ],
    "packPrices": [
      125,
      195
    ],
    "concerns": [
      "Uneven Skin Tone",
      "Dark Spots",
      "Tired-Looking Skin",
      "Tanned Skin",
      "Loss of Radiance",
    ],
    "productType": "Facewash",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": " Vitamin C, Orange Extract, Aloe Vera, Vitamin E, Glycerin, Green Tea Extract, Allantoin",
      "howToUse": "Wet your face with water and apply a small amount of face wash. Gently massage in circular motions for 1–2 minutes, then rinse thoroughly with clean water. Use twice daily for best results.",
      "benefits": "Brightening, Deep Cleansing, Radiance Boost, Antioxidant Protection, Oil Control, Skin Refreshing, Smoothness, Hydration, Glow Enhancement."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////GOLDEN GLOW FACE WASH////////////////////////////////////////////////////////////////////////
  {
    "id": "goldenglow-facewash",
    "name": "Aroma Signature+ Golden Glow Facewash",
    "category": "self-care",
    "description": "Golden Glow Face Wash. Enriched with Golden Glow, this refreshing face wash gently cleanses impurities, helps brighten dull-looking skin, and reveals a fresh, radiant complexion.",
    "fullDescription": "This Golden Glow face wash revitalizes the skin while helping improve the appearance of dullness, uneven tone, and fine lines. It leaves the skin feeling soft, smooth, hydrated, and beautifully radiant with a refined golden glow.",
    "images": [
      "Images/fw-gold.jpg",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "60ml",
      "120ml"
    ],
    "packPrices": [
      125,
      195
    ],
    "concerns": [
      "Uneven Skin Tone",
      "Dark Spots",
      "Tired-Looking Skin",
      "Tanned Skin",
      "Loss of Radiance",
    ],
    "productType": "Facewash",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "Gold Dust, Saffron Extract, Almond Oil, Vitamin E, Aloe Vera Extract, Honey, Shea Butter, Licorice Extract, Green Tea Extract, Glycerin, Allantoin, Sandalwood Extract, Rose Extract, Niacinamide, Hyaluronic Acid.",
      "howToUse": "Wet your face with water and apply a small amount of face wash. Gently massage in circular motions for 1–2 minutes, then rinse thoroughly with clean water. Use twice daily for best results.",
      "benefits": "Brightening, Deep Cleansing, Radiance Boost, Antioxidant Protection, Oil Control, Skin Refreshing, Smoothness, Hydration, Glow Enhancement."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////LEMON FACE WASH////////////////////////////////////////////////////////////////////////
  {
    "id": "lemon-facewash",
    "name": "Aroma Signature+ Lemon Facewash",
    "category": "self-care",
    "description": "Lemon Face Wash. Enriched with Lemon Extract, this refreshing face wash gently cleanses impurities, helps brighten dull-looking skin, and reveals a fresh, radiant complexion.",
    "fullDescription": "This Lemon face wash revitalizes the skin while helping improve the appearance of dullness, uneven tone, and fine lines. It leaves the skin feeling soft, smooth, hydrated, and beautifully radiant with a refined lemon glow.",
    "images": [
      "Images/fw-lemon.jpg",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "60ml",
      "120ml"
    ],
    "packPrices": [
      125,
      195
    ],
    "concerns": [
      "Uneven Skin Tone",
      "Dark Spots",
      "Tired-Looking Skin",
      "Tanned Skin",
      "Loss of Radiance",
    ],
    "productType": "Facewash",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "Lemon Extract, Vitamin C, Aloe Vera Extract, Honey, Shea Butter, Licorice Extract, Green Tea Extract, Glycerin, Allantoin, Sandalwood Extract, Rose Extract, Niacinamide, Hyaluronic Acid.",
      "howToUse": "Wet your face with water and apply a small amount of face wash. Gently massage in circular motions for 1–2 minutes, then rinse thoroughly with clean water. Use twice daily for best results.",
      "benefits": "Brightening, Deep Cleansing, Radiance Boost, Antioxidant Protection, Oil Control, Skin Refreshing, Smoothness, Hydration, Glow Enhancement."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////ALOEVERA FACE WASH////////////////////////////////////////////////////////////////////////
  {
    "id": "aloe-vera-facewash",
    "name": "Aroma Signature+ Aloe Vera Facewash",
    "category": "self-care",
    "description": "Aloe Vera Face Wash. Enriched with Aloe Vera Extract, this soothing face wash gently cleanses impurities, helps calm irritated skin, and reveals a fresh, radiant complexion.",
    "fullDescription": "This Aloe Vera face wash soothes the skin while helping improve the appearance of irritation, redness, and dryness. It leaves the skin feeling soft, smooth, hydrated, and beautifully radiant with a refined aloe vera glow.",
    "images": [
      "Images/fw-alovera.jpg",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "60ml",
      "120ml"
    ],
    "packPrices": [
      125,
      195
    ],
    "concerns": [
      "Uneven Skin Tone",
      "Dark Spots",
      "Tired-Looking Skin",
      "Tanned Skin",
      "Loss of Radiance",
    ],
    "productType": "Facewash",
    "details": {
      "skinType": "All Skin Types",
      "keyIngredients": "Aloe Vera Extract, Vitamin C, Honey, Shea Butter, Licorice Extract, Green Tea Extract, Glycerin, Allantoin, Sandalwood Extract, Rose Extract, Niacinamide, Hyaluronic Acid.",
      "howToUse": "Wet your face with water and apply a small amount of face wash. Gently massage in circular motions for 1–2 minutes, then rinse thoroughly with clean water. Use twice daily for best results.",
      "benefits": "Brightening, Deep Cleansing, Radiance Boost, Antioxidant Protection, Oil Control, Skin Refreshing, Smoothness, Hydration, Glow Enhancement."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////KERATIN HAIR TREATMENT////////////////////////////////////////////////////////////////////////
  {
    "id": "keratin-hair-treatment",
    "name": "Aroma Signature+ Keratin Hair Treatment",
    "category": "hair-treatment",
    "description": "Keratin Hair Treatment. Enriched with Keratin, this premium hair treatment helps reduce frizz, improve hair texture, and enhance your hair's natural shine. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and radiant.",
    "fullDescription": "Keratin Hair Treatment. Reveal naturally smooth and shiny hair with the Aroma Signature+ Keratin Hair Treatment. Enriched with Keratin, this premium treatment helps reduce frizz, improve hair texture, and enhance your hair's natural shine. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and radiant after every use. Perfect for regular hair care and special occasions alike.",
    "images": [
      "Images/Keratin Kit.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "300ml <br> (60ml x 4 & extra 60ml treatment)",
      "480ml <br> (120ml x 4)"
    ],
    "packPrices": [
      4495,
      5095
    ],
    "concerns": [
      "Frizzy Hair",
      "Damaged Hair",
      "Dry Hair",
      "Chemically Treated Hair",
      "Lack of Shine",
      "Split-End Prone Hair"
    ],
    "productType": "Hair Treatment",
    "details": {
      "Hair Type": "All Types Hair",
      "keyIngredients": "Keratin Protein, Argan Oil, Coconut Oil, Aloe Vera, Vitamin E, Shea Butter, Collagen.",
      "howToUse": "<b>Step 1 – Purifying Shampoo</b> <br>Wet the hair thoroughly and apply the Purifying Shampoo. Gently massage into the scalp and hair, then rinse thoroughly. Repeat if required.<br> <b>Step 2 – Keratin Protein Treatment</b> <br>Towel-dry the hair and apply the Keratin Protein Treatment evenly from roots to lengths, avoiding direct contact with the scalp. Distribute thoroughly and leave it on as directed before proceeding to styling/rinsing as recommended.<br><b>Step 3 – Protein Care Shampoo</b> <br>After the treatment process, cleanse the hair gently with Protein Care Shampoo. Massage lightly through the scalp and lengths, then rinse thoroughly. <br><b>Step 4 – Protein Care Conditioner</b> <br>Apply Protein Care Conditioner evenly through the lengths and ends of the hair. Leave for a few minutes and rinse thoroughly for soft, smooth, and manageable-looking hair.",
      "benefits": "Keratin Infusion, Frizz Control, Shine Enhancement, Strengthening, Smoothness, Hydration, Damage Repair."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////HAIR BOTOX TREATMENT////////////////////////////////////////////////////////////////////////
  {
    "id": "botox-hair-treatment",
    "name": "Aroma Signature+ Hair Botox Treatment",
    "category": "hair-treatment",
    "description": "Hair Botox Treatment. Enriched with a blend of nourishing ingredients, this premium hair treatment helps restore hair health, reduce frizz, and enhance shine. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized.",
    "fullDescription": "Hair Botox Treatment. Reveal naturally smooth and shiny hair with the Aroma Signature+ Hair Botox Treatment. Enriched with a blend of nourishing ingredients, this premium treatment helps restore hair health, reduce frizz, and enhance shine. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized after every use. Perfect for regular hair care and special occasions alike.",
    "images": [
      "Images/Hair Botox Kit.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "300ml <br> (60ml x 4 & extra 60ml treatment)",
      "480ml <br> (120ml x 4)"
    ],
    "packPrices": [
      4995,
      5595
    ],
    "concerns": [
      "Frizzy Hair",
      "Damaged Hair",
      "Dry Hair",
      "Chemically Treated Hair",
      "Lack of Shine",
      "Split-End Prone Hair"
    ],
    "productType": "Hair Treatment",
    "details": {
      "Hair Type": "All Types Hair",
      "keyIngredients": "Keratin Protein, Argan Oil, Coconut Oil, Aloe Vera, Vitamin E, Shea Butter, Collagen.",
      "howToUse": "<b>Step 1 – Purifying Shampoo</b> <br>Wet the hair thoroughly and apply the Purifying Shampoo. Gently massage into the scalp and hair, then rinse thoroughly. Repeat if required.<br> <b>Step 2 – Hair Botox Treatment</b> <br>Towel-dry the hair and apply the Hair Botox Treatment evenly from roots to lengths, avoiding direct contact with the scalp. Distribute thoroughly and leave it on as directed before proceeding to styling/rinsing as recommended.<br><b>Step 3 – Protein Care Shampoo</b> <br>After the treatment process, cleanse the hair gently with Protein Care Shampoo. Massage lightly through the scalp and lengths, then rinse thoroughly. <br><b>Step 4 – Protein Care Conditioner</b> <br>Apply Protein Care Conditioner evenly through the lengths and ends of the hair. Leave for a few minutes and rinse thoroughly for soft, smooth, and manageable-looking hair.",
      "benefits": "Deep Nourishment, Frizz Control, Shine Enhancement, Strengthening, Smoothness, Hydration, Damage Repair, Improved Manageabilty"
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////NANOPLASTIA TREATMENT////////////////////////////////////////////////////////////////////////
  {
    "id": "nanoplastia-treatment",
    "name": "Aroma Signature+ Brazillian Nanoplastia Treatment",
    "category": "hair-treatment",
    "description": "Nanoplastia Treatment. Reveal naturally smooth and shiny hair with the Aroma Signature+ Nanoplastia Treatment. Enriched with a blend of nourishing ingredients, this premium treatment helps restore hair health, reduce frizz, and enhance shine. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized.",
    "fullDescription": "Nanoplastia Treatment. Reveal naturally smooth and shiny hair with the Aroma Signature+ Nanoplastia Treatment. Enriched with a blend of nourishing ingredients, this premium treatment helps restore hair health, reduce frizz, and enhance shine. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized after every use. Perfect for regular hair care and special occasions alike.",
    "images": [
      "Images/Nanoplastia Kit.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "300ml <br> (60ml x 4 & extra 60ml treatment)",
      "480ml <br> (120ml x 4)"
    ],
    "packPrices": [
      4995,
      5595
    ],
    "concerns": [
      "Frizzy Hair",
      "Damaged Hair",
      "Dry Hair",
      "Chemically Treated Hair",
      "Lack of Shine",
      "Split-End Prone Hair"
    ],
    "productType": "Hair Treatment",
    "details": {
      "Hair Type": "All Types Hair",
      "keyIngredients": "Keratin Protein, Argan Oil, Coconut Oil, Aloe Vera, Vitamin E, Shea Butter, Collagen.",
      "howToUse": "<b>Step 1 – Purifying Shampoo</b> <br>Wet the hair thoroughly and apply the Purifying Shampoo. Gently massage into the scalp and hair, then rinse thoroughly. Repeat if required.<br> <b>Step 2 – Nanoplastia Treatment</b> <br>Towel-dry the hair and apply the Nanoplastia Treatment evenly from roots to lengths, avoiding direct contact with the scalp. Distribute thoroughly and leave it on as directed before proceeding to styling/rinsing as recommended.<br><b>Step 3 – Protein Care Shampoo</b> <br>After the treatment process, cleanse the hair gently with Protein Care Shampoo. Massage lightly through the scalp and lengths, then rinse thoroughly. <br><b>Step 4 – Protein Care Conditioner</b> <br>Apply Protein Care Conditioner evenly through the lengths and ends of the hair. Leave for a few minutes and rinse thoroughly for soft, smooth, and manageable-looking hair.",
      "benefits": "Deep Nourishment, Frizz Control, Shine Enhancement, Strengthening, Smoothness, Hydration, Damage Repair, Improved Manageabilty"
    },
    "isBestSeller": true,
    "isFeatured": true,
    "isNew": false
  },

  ////////////////////////////////////////ANTI DANDRUFF KIT////////////////////////////////////////////////////////
  {
    "id": "anti-dandruff-kit",
    "name": "Aroma Signature+ Anti Dandruff Kit",
    "category": "hair-treatment",
    "description": "Anti Dandruff Kit. Formulated to combat dandruff and soothe the scalp, this kit provides effective relief from flakiness and irritation.",
    "fullDescription": "Anti Dandruff Kit. Formulated to combat dandruff and soothe the scalp, this kit provides effective relief from flakiness and irritation.",
    "images": [
      "Images/Anti Dandruff Kit.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "140ml"
    ],
    "packPrices": [
      595
    ],
    "concerns": [
      "Dandruff",
      "Damaged Hair",
      "Dry Hair",
      "Scalp Discomfort",
      "Flaky Scalp",
      "Dandruff-Prone Hair"
    ],
    "productType": "Anti Dandruff Kit",
    "details": {
      "Hair Type": "All Types Hair",
      "keyIngredients": "Tea Tree Oil, Neem Extract, Aloe Vera, Salicylic Acid, Zinc Pyrithione, Menthol, Vitamin E, Glycerin, Aloe Vera, Hyaluronic Acid. Tea Tree Extract, Aloe Vera, Green Tea Extract, Mint Extract, Vitamin E, Glycerin.",
      "howToUse": "Apply the Anti-Dandruff Shampoo to wet hair and massage gently into the scalp before rinsing thoroughly, then apply the Anti-Dandruff Spa Cream to the scalp and hair lengths and leave as directed before rinsing. Finish with a few drops of Hair Serum on towel-dried or dry hair, focusing on the lengths and ends.",
      "benefits": "Dandruff Control, Flake Reduction, Scalp Cleansing, Scalp Refreshing, Itch Relief, Oil Balance, Scalp Nourishment, Hair Softening, Frizz Control, Hair Conditioning."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////PURIFYING SHAMPOO////////////////////////////////////////////////////////////////////////
  {
    "id": "protein-care-shampoo",
    "name": "Aroma Signature+ Protein Care Shampoo",
    "category": "hair-care",
    "description": "Protein Care Shampoo. Enriched with a blend of nourishing ingredients, this premium shampoo helps cleanse the scalp, remove impurities, and prepare hair for treatments. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized.",
    "fullDescription": " Protein Care Shampoo. Reveal naturally smooth and shiny hair with the Aroma Signature+ Protein Care Shampoo. Enriched with a blend of nourishing ingredients, this premium shampoo helps cleanse the scalp, remove impurities, and prepare hair for treatments. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized after every use. Perfect for regular hair care and special occasions alike.",
    "images": [
      "Images/Hair Care Shampoo.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "120ml",
      "200ml",
      "500ml",
      "1000ml"
    ],
    "packPrices": [
      595,
      995,
      2495,
      4800
    ],
    "concerns": [
      "Oily Scalp",
      "Damaged Hair",
      "Dry Hair",
      "Chemically Treated Hair",
      "Heavy & Lifeless Hair",
      "Pre-Treatment Cleansing"
    ],
    "productType": "Hair Care",
    "details": {
      "Hair Type": "All Types Hair",
      "keyIngredients": "Tea Tree Extract, Aloe Vera, Green Tea Extract, Mint Extract, Vitamin E, Glycerin.",
      "howToUse": "Wet the hair thoroughly and apply the Purifying Shampoo. Gently massage into the scalp and hair, then rinse thoroughly. Repeat if required.",
      "benefits": "Deep Cleansing, Oil Control, Build-Up Removal, Scalp Refreshing, Impurity Removal, Freshness, Lightweight Feel, Treatment Preparation."
    },
    "isBestSeller": true,
    "isFeatured": true,
    "isNew": false
  },

  ///////////////////////////////////////////////PURIFYING SHAMPOO/////////////////////////////////////////////////////////////////
  {
    "id": "purifying-shampoo",
    "name": "Aroma Signature+ Purifying Shampoo",
    "category": "hair-care",
    "description": "Purifying Shampoo. Enriched with a blend of nourishing ingredients, this premium shampoo helps cleanse the scalp, remove impurities, and prepare hair for treatments. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized.",
    "fullDescription": "Purifying Shampoo. Reveal naturally smooth and shiny hair with the Aroma Signature+ Purifying Shampoo. Enriched with a blend of nourishing ingredients, this premium shampoo helps cleanse the scalp, remove impurities, and prepare hair for treatments. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized after every use. Perfect for regular hair care and special occasions alike.",
    "images": [
      "Images/Purifying Shampoo.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "120ml",
      "200ml",
      "500ml",
      "1000ml"
    ],
    "packPrices": [
      595,
      995,
      2495,
      4800
    ],
    "concerns": [
      "Oily Scalp",
      "Damaged Hair",
      "Dry Hair",
      "Chemically Treated Hair",
      "Heavy & Lifeless Hair",
      "Pre-Treatment Cleansing"
    ],
    "productType": "Hair Care",
    "details": {
      "Hair Type": "All Types Hair",
      "keyIngredients": "Tea Tree Extract, Aloe Vera, Green Tea Extract, Mint Extract, Vitamin E, Glycerin.",
      "howToUse": "Wet the hair thoroughly and apply the Purifying Shampoo. Gently massage into the scalp and hair, then rinse thoroughly. Repeat if required.",
      "benefits": "Deep Cleansing, Oil Control, Build-Up Removal, Scalp Refreshing, Impurity Removal, Freshness, Lightweight Feel, Treatment Preparation."
    },
    "isBestSeller": true,
    "isFeatured": true,
    "isNew": false
  },

  ////////////////////////////////////////PROTEIN CARE CONDITIONER////////////////////////////////////////////////////////////////////////
  {
    "id": "protein-care-conditioner",
    "name": "Aroma Signature+ Protein Care Conditioner",
    "category": "hair-care",
    "description": "Protein Care Conditioner. Enriched with a blend of nourishing ingredients, this premium conditioner helps cleanse the scalp, remove impurities, and prepare hair for treatments. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized.",
    "fullDescription": " Protein Care Conditioner. Reveal naturally smooth and shiny hair with the Aroma Signature+ Protein Care Conditioner. Enriched with a blend of nourishing ingredients, this premium conditioner helps cleanse the scalp, remove impurities, and prepare hair for treatments. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized after every use. Perfect for regular hair care and special occasions alike.",
    "images": [
      "Images/Conditioner.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "120ml",
      "200ml",
      "500ml",
      "1000ml"
    ],
    "packPrices": [
      595,
      995,
      2495,
      4800
    ],
    "concerns": [
      "Tangled Hair",
      "Damaged Hair",
      "Dry Hair",
      "Chemically Treated Hair",
      "Heavy & Lifeless Hair",
      "Pre-Treatment Cleansing"
    ],
    "productType": "Hair Care",
    "details": {
      "Hair Type": "All Types Hair",
      "keyIngredients": "Tea Tree Extract, Aloe Vera, Green Tea Extract, Mint Extract, Vitamin E, Glycerin.",
      "howToUse": "Wet the hair thoroughly and apply the Purifying Conditioner . Gently massage into the scalp and hair, then rinse thoroughly. Repeat if required.",
      "benefits": "Deep Conditioning, Frizz Control, Softness, Smoothness, Shine Enhancement, Moisture Boost, Damage Care, Improved Manageability, Hair Nourishment, Hair Revitalization."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////HAIR SPA CREAM////////////////////////////////////////////////////////
  {
    "id": "hair-spa-cream",
    "name": "Aroma Signature+ Hair Spa Cream",
    "category": "hair-care",
    "description": "Hair Spa Cream. Enriched with a blend of nourishing ingredients, this premium treatment helps restore hair health, reduce frizz, and enhance shine. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized.",
    "fullDescription": "Hair Spa Cream. Enriched with a blend of nourishing ingredients, this premium treatment helps restore hair health, reduce frizz, and enhance shine. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized.",
    "images": [
      "Images/hairspa.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "500ml"
    ],
    "packPrices": [
      1200
    ],
    "concerns": [
      "Tangled Hair",
      "Damaged Hair",
      "Dry Hair",
      "Chemically Treated Hair",
      "Heavy & Lifeless Hair",
      "Frizzy Hair"
    ],
    "productType": "Hair Care",
    "details": {
      "Hair Type": "All Types Hair",
      "keyIngredients": "Keratin Protein, Amino Acids, Argan Oil, Coconut Oil, Collagen, Vitamin E, Aloe Vera, Hyaluronic Acid. Tea Tree Extract, Aloe Vera, Green Tea Extract, Mint Extract, Vitamin E, Glycerin.",
      "howToUse": "Wash hair thoroughly with Purifying Shampoo, towel-dry, and apply the Hair Spa Cream evenly section by section while avoiding the scalp. Leave it on for 20–30 minutes, then rinse thoroughly and blow-dry completely. Finish by straightening small sections with a flat iron to seal the treatment and achieve smooth, shiny, manageable hair.",
      "benefits": "Frizz Control, Hair Smoothing, Straightening Effect, Deep Nourishment, Shine Enhancement, Softness, Texture Refinement, Improved Manageability, Damage Care, Sleek Finish."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////KERATIN TREATMENT CREAM////////////////////////////////////////////////////////
  {
    "id": "keratin-treatment-cream",
    "name": "Aroma Signature+ Keratin Treatment Cream",
    "category": "hair-care",
    "description": "Keratin Treatment Cream. Enriched with a blend of nourishing ingredients, this premium treatment helps restore and protect hair from damage. It deeply conditions, smooths, and adds shine to hair, leaving it looking healthy and vibrant.",
    "fullDescription": " Keratin Treatment Cream. Reveal naturally smooth and shiny hair with the Aroma Signature+ Keratin Treatment Cream. Enriched with a blend of nourishing ingredients, this premium treatment helps restore and protect hair from damage. It deeply conditions, smooths, and adds shine to hair, leaving it looking healthy and vibrant after every use. Perfect for regular hair care and special occasions alike.",
    "images": [
      "Images/Keratin.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "120ml",
      "200ml",
      "500ml",
      "1000ml"
    ],
    "packPrices": [
      3310,
      5500,
      13790,
      25995
    ],
    "concerns": [
      "Tangled Hair",
      "Damaged Hair",
      "Dry Hair",
      "Chemically Treated Hair",
      "Heavy & Lifeless Hair",
      "Frizzy Hair"
    ],
    "productType": "Hair Care",
    "details": {
      "Hair Type": "All Types Hair",
      "keyIngredients": "Tea Tree Extract, Aloe Vera, Green Tea Extract, Mint Extract, Vitamin E, Glycerin.",
      "howToUse": "Wash hair thoroughly with Purifying Shampoo, towel-dry, and apply the Keratin Treatment Cream evenly section by section while avoiding the scalp. Leave it on for 20–30 minutes, then rinse thoroughly and blow-dry completely. Finish by straightening small sections with a flat iron to seal the treatment and achieve smooth, shiny, manageable hair.",
      "benefits": "Hair Smoothing, Frizz Control, Deep Conditioning, Damage Care, Softness, Shine Enhancement, Nourishment, Strengthening, Improved Manageability, Texture Refinement."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////HAIR BOTOX TREATMENT CREAM////////////////////////////////////////////////////////
  {
    "id": "botox-treatment-cream",
    "name": "Aroma Signature+ Hair Botox Treatment Cream",
    "category": "hair-care",
    "description": "Hair Botox Treatment Cream. Enriched with a blend of nourishing ingredients, this premium treatment helps restore hair health, reduce frizz, and enhance shine. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized.",
    "fullDescription": " Hair Botox Treatment Cream. Reveal naturally smooth and shiny hair with the Aroma Signature+ Hair Botox Treatment Cream. Enriched with a blend of nourishing ingredients, this premium treatment helps restore and protect hair from damage. It deeply conditions, smooths, and adds shine to hair, leaving it looking healthy and vibrant after every use. Perfect for regular hair care and special occasions alike.",
    "images": [
      "Images/Hair Botox.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "120ml",
      "200ml",
      "500ml",
      "1000ml"
    ],
    "packPrices": [
      3810,
      6350,
      15875,
      31995
    ],
    "concerns": [
      "Tangled Hair",
      "Damaged Hair",
      "Dry Hair",
      "Chemically Treated Hair",
      "Heavy & Lifeless Hair",
      "Frizzy Hair"
    ],
    "productType": "Hair Care",
    "details": {
      "Hair Type": "All Types Hair",
      "keyIngredients": "Tea Tree Extract, Aloe Vera, Green Tea Extract, Mint Extract, Vitamin E, Glycerin.",
      "howToUse": "Wash hair thoroughly with Purifying Shampoo, towel-dry, and apply the Hair Botox Treatment Cream evenly section by section while avoiding the scalp. Leave it on for 20–30 minutes, then rinse thoroughly and blow-dry completely. Finish by straightening small sections with a flat iron to seal the treatment and achieve smooth, shiny, manageable hair.",
      "benefits": "Hair Smoothing, Frizz Control, Deep Conditioning, Damage Care, Softness, Shine Enhancement, Nourishment, Strengthening, Improved Manageability, Texture Refinement."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },

  ////////////////////////////////////////NANOPLASTIA TREATMENT CREAM////////////////////////////////////////////////////////
  {
    "id": "nanoplastia-treatment-cream",
    "name": "Aroma Signature+ Brazillian Nanoplastia Treatment Cream",
    "category": "hair-care",
    "description": "Nanoplastia Treatment Cream. Enriched with a blend of nourishing ingredients, this premium treatment helps restore hair health, reduce frizz, and enhance shine. It deeply nourishes, strengthens hair strands, and leaves your hair looking smooth, soft, and revitalized.",
    "fullDescription": " Nanoplastia Treatment Cream. Reveal naturally smooth and shiny hair with the Aroma Signature+ Nanoplastia Treatment Cream. Enriched with a blend of nourishing ingredients, this premium treatment helps restore and protect hair from damage. It deeply conditions, smooths, and adds shine to hair, leaving it looking healthy and vibrant after every use. Perfect for regular hair care and special occasions alike.",
    "images": [
      "Images/Nanoplatia.png",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "120ml",
      "200ml",
      "500ml",
      "1000ml"
    ],
    "packPrices": [
      4510,
      7515,
      18790,
      35995
    ],
    "concerns": [
      "Tangled Hair",
      "Damaged Hair",
      "Dry Hair",
      "Chemically Treated Hair",
      "Heavy & Lifeless Hair",
      "Frizzy Hair"
    ],
    "productType": "Hair Care",
    "details": {
      "Hair Type": "All Types Hair",
      "keyIngredients": "Keratin Protein, Amino Acids, Argan Oil, Coconut Oil, Collagen, Vitamin E, Aloe Vera, Hyaluronic Acid. Tea Tree Extract, Aloe Vera, Green Tea Extract, Mint Extract, Vitamin E, Glycerin.",
      "howToUse": "Wash hair thoroughly with Purifying Shampoo, towel-dry, and apply the Nanoplastia Treatment Cream evenly section by section while avoiding the scalp. Leave it on for 20–30 minutes, then rinse thoroughly and blow-dry completely. Finish by straightening small sections with a flat iron to seal the treatment and achieve smooth, shiny, manageable hair.",
      "benefits": "Frizz Control, Hair Smoothing, Straightening Effect, Deep Nourishment, Shine Enhancement, Softness, Texture Refinement, Improved Manageability, Damage Care, Sleek Finish."
    },
    "isBestSeller": true,
    "isFeatured": false,
    "isNew": false
  },
  ////////////////////////////////////////VITAMIN C BLEACH////////////////////////////////////////////////////////////////////////
  {
    "id": "vitamin-c-bleach",
    "name": "Aroma Signature+ Vitamin C Bleach",
    "category": "skin-care",
    "description": "Vitamin C Bleach. Enriched with Vitamin C and skin-brightening ingredients, this gentle bleach helps reduce the appearance of facial hair, brighten the complexion, and reveal a fresh, smooth, radiant-looking finish.",
    "fullDescription": "Dramatically lighten your skin and enhance its radiance. It deeply nourishes, strengthens skin cells, and leaves your skin looking smooth, soft, and revitalized after every use. Perfect for regular skin care and special occasions alike.",
    "images": [
      "Images/Vitamin Bleach.jpg",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "Activator Powder: 75gm<br>Bleach Cream: 400gm<br><b>Total Weight: 475gm</b><br> "
    ],
    "packPrices": [
      895
    ],
    "concerns": [
      "Dark Circles",
      "Hyperpigmentation",
      "Dull Skin",
      "Uneven Skin Tone",
      "Loss of Elasticity",
      "Fine Lines and Wrinkles"
    ],
    "productType": "Skin Care",
    "details": {
      "Skin Type": "All Skin Types",
      "keyIngredients": "Vitamin C, Hyaluronic Acid, Niacinamide, Aloe Vera, Vitamin E, Shea Butter, Collagen.",
      "howToUse": "Mix the bleach cream and activator in the recommended ratio, apply an even layer over clean facial skin while avoiding the eye and lip area, leave for the recommended time, and gently remove with water. Always follow the product label instructions and perform a patch test before use.",
      "benefits": "Skin Brightening, Hyperpigmentation Reduction, Radiance Enhancement, Collagen Boost, Hydration, Smoothness, Elasticity Improvement, Fine Line Reduction."
    },
    "isBestSeller": true,
    "isFeatured": true,
    "isNew": false
  },

  ////////////////////////////////////////SKIN WHITENING BLEACH////////////////////////////////////////////////////////////////////////
  {
    "id": "skin-whitening-bleach",
    "name": "Aroma Signature+ Skin Whitening Bleach",
    "category": "skin-care",
    "description": "Skin Whitening Bleach. Enriched with skin-brightening ingredients, this gentle bleach helps reduce the appearance of dark spots, brighten the complexion, and reveal a fresh, smooth, radiant-looking finish.",
    "fullDescription": "Dramatically lighten your skin and enhance its radiance. It deeply nourishes, strengthens skin cells, and leaves your skin looking smooth, soft, and revitalized after every use. Perfect for regular skin care and special occasions alike.",
    "images": [
      "Images/Whitening Bleach.jpg",
    ],
    "price": 1299,
    "oldPrice": 1599,
    "rating": 4.8,
    "reviewCount": 142,
    "packs": [
      "Activator Powder: 75gm<br>Bleach Cream: 400gm<br><b>Total Weight: 475gm</b><br> "
    ],
    "packPrices": [
      895
    ],
    "concerns": [
      "Dark Circles",
      "Hyperpigmentation",
      "Dull Skin",
      "Uneven Skin Tone",
      "Loss of Elasticity",
      "Fine Lines and Wrinkles"
    ],
    "productType": "Skin Care",
    "details": {
      "Skin Type": "All Skin Types",
      "keyIngredients": "Vitamin C, Hyaluronic Acid, Niacinamide, Aloe Vera, Vitamin E, Shea Butter, Collagen.",
      "howToUse": "Mix the bleach cream and activator in the recommended ratio, apply an even layer over clean facial skin while avoiding the eye and lip area, leave for the recommended time, and gently remove with water. Always follow the product label instructions and perform a patch test before use.",
      "benefits": "Skin Brightening, Hyperpigmentation Reduction, Radiance Enhancement, Collagen Boost, Hydration, Smoothness, Elasticity Improvement, Fine Line Reduction."
    },
    "isBestSeller": true,
    "isFeatured": true,
    "isNew": false
  },

];





// Canonical category normalization utility
function normalizeCategory(category) {
  if (!category) return "";
  if (Array.isArray(category)) {
    category = category[0] || "";
  }
  const clean = String(category).trim().toLowerCase().replace(/[\s_]+/g, "-");
  if (clean === "skin-care" || clean === "skincare" || clean === "skin") return "skin-care";
  if (clean === "facial-kits" || clean === "facial-kit" || clean === "facialkits" || clean === "facialkit" || clean === "facial") return "facial-kits";
  if (clean === "hair-care" || clean === "haircare" || clean === "hair") return "hair-care";
  if (clean === "hair-treatment" || clean === "hair-treatments" || clean === "hairtreatment" || clean === "hairtreatments") return "hair-treatment";
  if (clean === "self-care" || clean === "selfcare" || clean === "self") return "self-care";
  return clean;
}

// Helper utilities for getting products
const ProductCatalog = {
  // Returns the product array directly from the source file (PRODUCTS_DATA).
  // The server writes Admin CRUD changes to this file, making it the truth.
  getAll: () => PRODUCTS_DATA,
  getById: (id) => ProductCatalog.getAll().find(p => p.id === id),
  getByCategory: (category) => {
    const target = normalizeCategory(category);
    return ProductCatalog.getAll().filter(p => normalizeCategory(p.category) === target);
  },
  getBestSellers: () => ProductCatalog.getAll().filter(p => p.isBestSeller),
  getFeatured: () => ProductCatalog.getAll().filter(p => p.isFeatured),
  getNewArrivals: () => ProductCatalog.getAll().filter(p => p.isNew),
  getPackPrice: (product, packIndex = 0) => {
    if (!product) return 0;
    const idx = parseInt(packIndex, 10);
    if (Array.isArray(product.packPrices) && product.packPrices.length > 0) {
      if (!isNaN(idx) && product.packPrices[idx] !== undefined) {
        return product.packPrices[idx];
      }
      return product.packPrices[0];
    }
    return product.price || 0;
  },
  getPackPrices: (product) => {
    if (!product) return [];
    if (Array.isArray(product.packPrices) && product.packPrices.length > 0) {
      return product.packPrices;
    }
    if (Array.isArray(product.packs) && product.packs.length > 0) {
      return product.packs.map(() => product.price || 0);
    }
    return [product.price || 0];
  },
  search: (query) => {
    const list = ProductCatalog.getAll();
    const q = query.toLowerCase().trim();
    if (!q) return list;
    return list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.fullDescription && p.fullDescription.toLowerCase().includes(q)) ||
      (p.productType && p.productType.toLowerCase().includes(q)) ||
      (p.concerns && p.concerns.some(c => c.toLowerCase().includes(q)))
    );
  }
};

