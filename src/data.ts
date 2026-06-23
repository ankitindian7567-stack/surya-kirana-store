import { Product, Category, Review, PromoOffer } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "grocery",
    name: "Grocery Staples",
    hindiName: "किराना और अनाज",
    icon: "ShoppingBag",
    description: "Premium Rice, Shudh Atta, Dal, Oils, Ghee, and Spices for your daily meals.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "puja",
    name: "Puja Samagri",
    hindiName: "पूजा सामग्री",
    icon: "Sparkles",
    description: "Pure and traditional Agarbatti, Ghee, Diyas, Camphor, and festive essentials.",
    image: "https://images.unsplash.com/photo-1561376374-885060efd5f9?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "snacks",
    name: "Snacks & Beverages",
    hindiName: "स्नैक्स और पेय",
    icon: "Coffee",
    description: "Delicious tea, rich coffee, juices, chips, chocolates, and namkeen.",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "essentials",
    name: "Daily Essentials",
    hindiName: "दैनिक जरूरतें",
    icon: "Milk",
    description: "Fresh dairy products, bakery loaves, personal hygiene, and baby care items.",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "household",
    name: "Household Products",
    hindiName: "घरेलू सामान",
    icon: "Home",
    description: "Surface cleaners, detergents, dishwash bars, air fresheners, and kitchen tools.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600"
  }
];

export const PRODUCTS: Product[] = [
  // GROCERY
  {
    id: "gr-1",
    name: "Charminar Shudh Chakki Atta",
    hindiName: "चारमीनार शुद्ध चक्की आटा",
    category: "grocery",
    price: 190,
    originalPrice: 210,
    unit: "5 Kg",
    image: "/charminar_atta.png",
    description: "Premium quality wheat flour, perfect for making soft, fluffy, and delicious rotis daily.",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: "gr-2",
    name: "India Gate Basmati Rice (Premium)",
    hindiName: "इंडिया गेट बासमती चावल",
    category: "grocery",
    price: 115,
    originalPrice: 135,
    unit: "1 Kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600",
    description: "Aromatic and extra-long grain basmati rice, perfectly aged for sweet flavor and non-sticky texture.",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.9
  },
  {
    id: "gr-3",
    name: "Premium Moong Dal (Split)",
    hindiName: "प्रीमियम मूंग दाल",
    category: "grocery",
    price: 120,
    originalPrice: 135,
    unit: "1 Kg",
    image: "/moong_dal.png",
    description: "High-protein, nutritious unpolished Moong Dal split. Easy to cook and easily digestible.",
    isFeatured: false,
    inStock: true,
    rating: 4.6
  },
  {
    id: "gr-6",
    name: "Premium Arhar Dal (Toor)",
    hindiName: "प्रीमियम अरहर दाल (तुअर)",
    category: "grocery",
    price: 120,
    originalPrice: 145,
    unit: "1 Kg",
    image: "/arhar_dal.png",
    description: "Unpolished split pigeon peas, rich in protein. A staple for delicious daily dal-chawal.",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.7
  },
  {
    id: "gr-7",
    name: "Premium Masoor Dal (Split)",
    hindiName: "प्रीमियम मसूर दाल",
    category: "grocery",
    price: 120,
    originalPrice: 135,
    unit: "1 Kg",
    image: "/masoor_dal.png",
    description: "Nutritious and quick-cooking red split Masoor dal, high in iron and dietary fiber.",
    isFeatured: false,
    inStock: true,
    rating: 4.6
  },
  {
    id: "gr-8",
    name: "Premium Matar Dal",
    hindiName: "प्रीमियम मटर दाल",
    category: "grocery",
    price: 60,
    originalPrice: 75,
    unit: "1 Kg",
    image: "/matar_dal.png",
    description: "High quality split yellow peas, great for making delicious local Buxar styled ghugni and dal.",
    isFeatured: false,
    inStock: true,
    rating: 4.5
  },
  {
    id: "gr-9",
    name: "Premium Chitra Rajma",
    hindiName: "प्रीमियम चित्र राजमा",
    category: "grocery",
    price: 170,
    originalPrice: 195,
    unit: "1 Kg",
    image: "/rajma.png",
    description: "Premium quality kidney beans, cooks to a creamy texture. Best enjoyed with steaming rice.",
    isFeatured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: "gr-10",
    name: "Local Harfor Dal (Sthaniya)",
    hindiName: "स्थानीय हरफोर दाल",
    category: "grocery",
    price: 66,
    originalPrice: 80,
    unit: "1 Kg",
    image: "/harfor_dal.png",
    description: "Traditional, locally sourced Harfor Dal from Buxar. Super healthy and authentic taste.",
    isFeatured: true,
    inStock: true,
    rating: 4.9
  },
  {
    id: "gr-4",
    name: "Fortune Pure Mustard Oil",
    hindiName: "फॉर्च्यून सरसों का तेल",
    category: "grocery",
    price: 180,
    originalPrice: 210,
    unit: "1 Ltr",
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=600",
    description: "Cold-pressed, pungent mustard oil, perfect for Indian traditional cooking and pickles.",
    isFeatured: true,
    inStock: true,
    rating: 4.7
  },

  // PUJA
  {
    id: "pj-1",
    name: "Zed Black Premium Agarbatti (Sandalwood)",
    hindiName: "ज़ेड ब्लैक चंदन अगरबत्ती",
    category: "puja",
    price: 65,
    originalPrice: 80,
    unit: "1 Pack (120 Sticks)",
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600",
    description: "Premium charcoal-free long-burning incense sticks with soul-soothing, traditional Sandalwood fragrance.",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: "pj-2",
    name: "Handmade Clay Diyas (Pack of 12)",
    hindiName: "मिट्टी के हस्तनिर्मित दिए",
    category: "puja",
    price: 49,
    originalPrice: 75,
    unit: "12 Pcs",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=600",
    description: "Eco-friendly, beautifully molded clay diyas, ideal for Pujas and festive decorations.",
    isFeatured: true,
    inStock: true,
    rating: 4.5
  },
  {
    id: "pj-3",
    name: "Mangaldeep Camphor Tablets (Kafur)",
    hindiName: "मंगलदीप कपूर टिकिया",
    category: "puja",
    price: 40,
    originalPrice: 50,
    unit: "1 Small Pack",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=600", // pure essence look
    description: "100% camphor tablets designed for smooth burning, leaving behind zero ash and a sacred fragrance.",
    isFeatured: false,
    inStock: true,
    rating: 4.7
  },
  {
    id: "pj-4",
    name: "Premium Puja Thali Combo Pack",
    hindiName: "पूजा थाली कॉम्बो पैक",
    category: "puja",
    price: 299,
    originalPrice: 399,
    unit: "1 Combo",
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=600",
    description: "Complete festival combo containing Janeu, Kumkum, Roli, Akshat, Matchbox, and Cotton wicks.",
    isFeatured: true,
    inStock: true,
    rating: 4.7
  },

  // SNACKS
  {
    id: "sn-1",
    name: "Wagh Bakri Premium Leaf Tea",
    hindiName: "वाघ बकरी प्रीमियम चाय",
    category: "snacks",
    price: 135,
    originalPrice: 150,
    unit: "500 Gm",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    description: "Strong taste, rich colour, and premium aroma, handpicked from selected gardens of Assam.",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: "sn-2",
    name: "Haldiram's Bhujia Sev",
    hindiName: "हल्दीराम भुजिया सेव",
    category: "snacks",
    price: 110,
    originalPrice: 125,
    unit: "400 Gm",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600",
    description: "A classic crispy Indian snack made of moth beans, gram flour, and signature spices. Extremely delicious.",
    isFeatured: true,
    inStock: true,
    rating: 4.6
  },
  {
    id: "sn-3",
    name: "Britannia Marie Gold Biscuits (Family Pack)",
    hindiName: "ब्रिटानिया मैरी गोल्ड बिस्कुट",
    category: "snacks",
    price: 45,
    originalPrice: 50,
    unit: "400 Gm",
    image: "https://images.unsplash.com/photo-1558961309-dbdf717983c8?auto=format&fit=crop&q=80&w=600",
    description: "Light and crispy tea-time cookies, infused with vitamins and active minerals.",
    isFeatured: false,
    inStock: true,
    rating: 4.5
  },

  // DAILY ESSENTIALS
  {
    id: "es-1",
    name: "Amul Taaza Fresh Milk",
    hindiName: "अमूल ताजा फ्रेश मिल्क",
    category: "essentials",
    price: 28,
    originalPrice: 30,
    unit: "500 Ml",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600",
    description: "Fresh, homogenized and pasteurized toned milk, rich in calcium and essential vitamins.",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.9
  },
  {
    id: "es-2",
    name: "Dettol Liquid Handwash Refill",
    hindiName: "डेटॉल हैंडवाश रिफिल",
    category: "essentials",
    price: 99,
    originalPrice: 110,
    unit: "750 Ml",
    image: "https://images.unsplash.com/photo-1607006342411-91f11f03411f?auto=format&fit=crop&q=80&w=600",
    description: "Trusted germ protection formula. Soft on skin, infused with refreshing moisturizers.",
    isFeatured: false,
    inStock: true,
    rating: 4.7
  },

  // HOUSEHOLD
  {
    id: "hh-1",
    name: "Vim Dishwash Gel (Lemon Splash)",
    hindiName: "विम डिशवॉश जेल",
    category: "household",
    price: 140,
    originalPrice: 160,
    unit: "750 Ml",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600",
    description: "Vim gel with power of 100 lemons dissolves grease completely and neutralizes tough utensil odours.",
    isFeatured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: "hh-2",
    name: "Surf Excel Easy Wash Detergent",
    hindiName: "सर्फ एक्सेल डिटर्जेंट पाउडर",
    category: "household",
    price: 135,
    originalPrice: 155,
    unit: "1 Kg",
    image: "https://images.unsplash.com/photo-1610557892470-766107ecf3ec?auto=format&fit=crop&q=80&w=600", // cleaning box feel
    description: "Enzyme-enriched heavy-duty laundry washing powder. Removes tough stains in a single bucket wash.",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.7
  },
  // ANIK GHEE
  {
    id: "ag-1",
    name: "Anik Shudh Desi Ghee",
    hindiName: "आनिक शुद्ध देसी घी",
    category: "grocery",
    price: 55,
    originalPrice: 60,
    unit: "100 Grm",
    image: "https://images.unsplash.com/photo-1634818462211-ee45f23accb1?auto=format&fit=crop&q=80&w=600",
    description: "Anik Shudh Desi Ghee made from fresh cream, rich aroma & granular texture. Ideal for cooking and Puja.",
    isFeatured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: "ag-2",
    name: "Anik Shudh Desi Ghee",
    hindiName: "आनिक शुद्ध देसी घी",
    category: "grocery",
    price: 100,
    originalPrice: 110,
    unit: "200 Grm",
    image: "https://images.unsplash.com/photo-1634818462211-ee45f23accb1?auto=format&fit=crop&q=80&w=600",
    description: "Anik Shudh Desi Ghee made from fresh cream, rich aroma & granular texture. Ideal for cooking and Puja.",
    isFeatured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: "ag-3",
    name: "Anik Shudh Desi Ghee",
    hindiName: "आनिक शुद्ध देसी घी",
    category: "grocery",
    price: 245,
    originalPrice: 260,
    unit: "500 Grm",
    image: "https://images.unsplash.com/photo-1634818462211-ee45f23accb1?auto=format&fit=crop&q=80&w=600",
    description: "Anik Shudh Desi Ghee made from fresh cream, rich aroma & granular texture. Ideal for cooking and Puja.",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: "ag-4",
    name: "Anik Shudh Desi Ghee",
    hindiName: "आनिक शुद्ध देसी घी",
    category: "grocery",
    price: 475,
    originalPrice: 495,
    unit: "1 Kg",
    image: "https://images.unsplash.com/photo-1634818462211-ee45f23accb1?auto=format&fit=crop&q=80&w=600",
    description: "Anik Shudh Desi Ghee made from fresh cream, rich aroma & granular texture. Ideal for cooking and Puja.",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.8
  },
  // PATANJALI GHEE
  {
    id: "pg-1",
    name: "Patanjali Cow Ghee",
    hindiName: "पतंजलि गाय का घी",
    category: "grocery",
    price: 75,
    originalPrice: 85,
    unit: "100 Grm",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=600",
    description: "Patanjali pure cow ghee with rich aroma, natural & healthy. Made from pure desi cow milk.",
    isFeatured: true,
    inStock: true,
    rating: 4.7
  },
  {
    id: "pg-2",
    name: "Patanjali Cow Ghee",
    hindiName: "पतंजलि गाय का घी",
    category: "grocery",
    price: 145,
    originalPrice: 155,
    unit: "200 Grm",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=600",
    description: "Patanjali pure cow ghee with rich aroma, natural & healthy. Made from pure desi cow milk.",
    isFeatured: true,
    inStock: true,
    rating: 4.7
  },
  {
    id: "pg-3",
    name: "Patanjali Cow Ghee",
    hindiName: "पतंजलि गाय का घी",
    category: "grocery",
    price: 355,
    originalPrice: 375,
    unit: "500 Grm",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=600",
    description: "Patanjali pure cow ghee with rich aroma, natural & healthy. Made from pure desi cow milk.",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.7
  },
  {
    id: "pg-4",
    name: "Patanjali Cow Ghee",
    hindiName: "पतंजलि गाय का घी",
    category: "grocery",
    price: 675,
    originalPrice: 700,
    unit: "1 Kg",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=600",
    description: "Patanjali pure cow ghee with rich aroma, natural & healthy. Made from pure desi cow milk.",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.7
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r-1",
    name: "Rajesh Kumar",
    rating: 5,
    comment: "This is my go-to store for all grocery and puja items. Surya Kirana Store has been serving us for years. The quality of rice and pulses is always superior. Plus, their WhatsApp delivery service is super fast!",
    date: "May 25, 2026",
    status: "Verified Buyer"
  },
  {
    id: "r-2",
    name: "Suman Sharma",
    rating: 5,
    comment: "Excellent service! During festivals like Diwali and Karwa Chauth, they pack beautiful premium Puja Thalis and high-quality Diyas, saving us so much time. Prices are highly affordable and genuine.",
    date: "April 14, 2026",
    status: "Verified Regular Customer"
  },
  {
    id: "r-3",
    name: "Amit Patel",
    rating: 4.5,
    comment: "Very friendly owners who are always smiling. They keep highly fresh stock, especially the ghee, paneer, and milk packs. Highly recommended local supermarket in the neighborhood!",
    date: "March 20, 2026",
    status: "Verified Buyer"
  }
];

export const PROMO_OFFERS: PromoOffer[] = [
  {
    id: "po-1",
    title: "Summer Chutney & Refreshment Festival",
    subtitle: "Get cooled down with exciting deals on beverages, squashes, and daily essentials",
    code: "SURYA10",
    discount: "Flat 10% Off",
    expiryDate: "June 30, 2026",
    bgGradient: "from-amber-500 to-orange-600"
  },
  {
    id: "po-2",
    title: "Eco Puja Samagri Super Value Bundle",
    subtitle: "Handmade clay diyas, premium organic Agarbatti, and pure cow ghee combo",
    code: "PUJA15",
    discount: "Flat 15% Off",
    expiryDate: "July 15, 2026",
    bgGradient: "from-yellow-500 to-amber-600"
  }
];

export const STORE_INFO = {
  name: "Surya Kirana Store",
  tagline: "Har Zaroorat Ka Vishwas, Surya Kirana Store Ke Saath",
  owner: "Om Prakash Singh",
  phone: "+91 70044 10152,+91 9525486056",
  whatsapp: "+917004410152",
  email: "care@suryakiranastore.com",
  address: "Shop No. 1, Surya Kirana Store,itarhi , kukudha chowk, buxar,bihar, Pin - 802123",
  hours: [
    { days: "Monday - Saturday", time: "6:00 AM - 10:00 PM" },
    { days: "Sunday", time: "6:00 AM - 10:00 PM" }
  ],
  mapsLink: "https://maps.google.com/?q=Surya+Kirana+Store+Gandhinagar",
  // Standard free embed code coordinates representation
  embedMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14668.513231454157!2d72.63737564756545!3d23.202354784407335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b0bdf6ec9fd%3A0xff3c1782627e7d7f!2sGandhinagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1717400000000!5m2!1sen!2sin"
};
