import React, { useState, useEffect } from "react";
import PromoBanner from "./components/PromoBanner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Categories from "./components/Categories";
import Products from "./components/Products";
import WhyChooseUs from "./components/WhyChooseUs";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import CartDrawer from "./components/CartDrawer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer from "./components/Footer";
import RewardCenter from "./components/RewardCenter";
import BillingDesk from "./components/BillingDesk";
import { Product, CartItem } from "./types";
import { STORE_INFO } from "./data";
import { 
  ShoppingBag, 
  Coins, 
  Calculator, 
  Store, 
  MessageSquare,
  Gift,
  HelpCircle,
  Clock,
  MapPin,
  ClipboardList
} from "lucide-react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Tab-based Mobile-focused navigation state
  // Tabs: "shop", "rewards", "billing", "about"
  const [activeTab, setActiveTab] = useState<string>("shop");

  // Surya Coins Gamification State
  const [coins, setCoins] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("surya_coins_balance");
      return saved ? parseInt(saved, 10) : 150; // default initial chest coins
    } catch {
      return 150;
    }
  });

  // Unlocked coupon codes list
  const [unlockedCoupons, setUnlockedCoupons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("surya_unlocked_coupons");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync coins balance to local storage
  useEffect(() => {
    localStorage.setItem("surya_coins_balance", coins.toString());
  }, [coins]);

  // Sync unlocked coupons list to local storage
  useEffect(() => {
    localStorage.setItem("surya_unlocked_coupons", JSON.stringify(unlockedCoupons));
  }, [unlockedCoupons]);

  // Load cart items from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("surya_kirana_cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Sync cart items back to localStorage upon modification
  const saveCartToStorage = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    try {
      localStorage.setItem("surya_kirana_cart", JSON.stringify(updatedItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  };

  // Add Item or Increment Quantity
  const handleAddToCart = (product: Product) => {
    const existingIndex = cartItems.findIndex((item) => item.product.id === product.id);

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      saveCartToStorage(updated);
    } else {
      const updated = [...cartItems, { product, quantity: 1 }];
      saveCartToStorage(updated);
    }
  };

  // Remove Item or Decrement Quantity
  const handleRemoveFromCart = (product: Product) => {
    const existingIndex = cartItems.findIndex((item) => item.product.id === product.id);

    if (existingIndex > -1) {
      const updated = [...cartItems];
      if (updated[existingIndex].quantity > 1) {
        updated[existingIndex].quantity -= 1;
      } else {
        updated.splice(existingIndex, 1);
      }
      saveCartToStorage(updated);
    }
  };

  // Empty cart drawer completely
  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  // Smooth scroll handler inside tab view
  const handleNavigateSection = (sectionId: string) => {
    setActiveTab("shop");
    setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Handle coupon unlocking inside reward center
  const handleUnlockCoupon = (code: string, cost: number) => {
    if (coins >= cost) {
      setCoins(prev => prev - cost);
      setUnlockedCoupons(prev => [...prev, code]);
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-orange-50/5 flex flex-col font-sans select-none antialiased text-gray-800 pb-20 sm:pb-0">
      
      {/* 1. Upper Promos Announcement banner */}
      <PromoBanner />

      {/* 2. Responsive sticky primary header navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        onNavigateSection={(id) => {
          if (id === "rewards") {
            setActiveTab("rewards");
          } else if (id === "billing") {
            setActiveTab("billing");
          } else if (id === "contact" || id === "reviews" || id === "about") {
            setActiveTab("about");
            setTimeout(() => {
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          } else {
            handleNavigateSection(id);
          }
        }}
      />

      {/* Main Switchable Tabbed View Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-0 sm:py-6">
        
        {/* SHOP TAB (घर / दुकान) */}
        {activeTab === "shop" && (
          <div className="space-y-0.5">
            {/* Immersive store introduction hero banner */}
            <Hero 
              onShopNowClick={() => {
                const target = document.getElementById("categories");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
              onContactClick={() => {
                setActiveTab("about");
                setTimeout(() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            />

            {/* Departmental categories */}
            <Categories
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onCategorySelected={() => {
                setTimeout(() => {
                  document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }}
            />

            {/* Products grid */}
            <Products
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />

            {/* Quick trust metrics */}
            <WhyChooseUs />
          </div>
        )}

        {/* COIN REWARD TAB (पुरस्कार और कॉइन्स) */}
        {activeTab === "rewards" && (
          <RewardCenter 
            coins={coins}
            setCoins={setCoins}
            unlockedCoupons={unlockedCoupons}
            onUnlockCoupon={handleUnlockCoupon}
          />
        )}

        {/* DIGITAL BILLING TAB (डिजिटल बिल काउंटर) */}
        {activeTab === "billing" && (
          <BillingDesk 
            cartItems={cartItems}
            coins={coins}
          />
        )}

        {/* ABOUT / CONTACT TAB (अबाउट और संपर्क) */}
        {activeTab === "about" && (
          <div className="space-y-6">
            {/* Main store narrative summary detailing Owner Ankit Kumar explicitly */}
            <div className="bg-white rounded-3xl p-6 border border-orange-100/60 shadow-xl shadow-orange-500/5 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-24 h-24 bg-gradient-to-tr from-orange-500 to-yellow-405 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                  <Store className="w-12 h-12" />
                </div>
                <div className="text-center md:text-left">
                  <span className="bg-orange-50 text-orange-650 text-[10px] uppercase font-black px-2.5 py-1 rounded-full border border-orange-100">
                    Trusted Shop Profile
                  </span>
                  <h2 className="font-display font-black text-2xl text-gray-950 mt-2 leading-none">
                    {STORE_INFO.name}
                  </h2>
                  <p className="text-orange-600 font-bold text-xs mt-1">
                    Shop Owner: <span className="underline font-extrabold">{STORE_INFO.owner}</span>
                  </p>
                  <p className="text-gray-550 text-xs sm:text-sm mt-3 leading-relaxed">
                    Welcome to Surya Kirana Store, personally managed by {STORE_INFO.owner}. Serving kukurha since 1980 with premium grains, organic Puja essentials, pure dairy, and household cleaners. Our mission is to combine friendly local relationships with state-of-the-art visual billing!
                  </p>
                </div>
              </div>

              {/* Direct call card */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100 text-center">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <Clock className="w-5 h-5 text-orange-550 mx-auto mb-1" />
                  <span className="block text-[10px] text-gray-400 font-bold uppercase">Work Hours</span>
                  <span className="text-xs text-gray-700 font-black">7:30 AM - 10:00 PM</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <MapPin className="w-5 h-5 text-orange-550 mx-auto mb-1" />
                  <span className="block text-[10px] text-gray-400 font-bold uppercase">Store Address</span>
                  <span className="text-xs text-gray-700 font-black line-clamp-1 truncate">Kukurha, Buxar</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 col-span-2 sm:col-span-1">
                  <MessageSquare className="w-5 h-5 text-green-550 mx-auto mb-1" />
                  <span className="block text-[10px] text-gray-400 font-bold uppercase">Store Phone</span>
                  <a href={`tel:${STORE_INFO.phone}`} className="text-xs text-green-600 font-black hover:underline">{STORE_INFO.phone}</a>
                </div>
              </div>
            </div>

            <AboutUs />
            
            <Reviews />
            
            <Contact />
          </div>
        )}

      </main>

      {/* 3. Sticky Bottom Navigation Bar for attractive phone app type UI */}
      {/* Resides fixedly on small devices, floating center column on wide devices */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-orange-100/60 shadow-lg z-40 px-3 py-1 sm:hidden">
        <div className="max-w-md mx-auto flex items-center justify-around">
          
          {/* Tab 1: Shop */}
          <button 
            onClick={() => setActiveTab("shop")}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition ${
              activeTab === "shop" 
                ? "text-orange-600 font-extrabold" 
                : "text-gray-400 hover:text-gray-600 font-semibold"
            }`}
            id="tab-btn-shop"
          >
            <Store className="w-5.5 h-5.5" />
            <span className="text-[10px] tracking-tight whitespace-nowrap block">दुकान (Shop)</span>
          </button>

          {/* Tab 2: Reward coins */}
          <button 
            onClick={() => setActiveTab("rewards")}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition group relative ${
              activeTab === "rewards" 
                ? "text-orange-600 font-extrabold" 
                : "text-gray-400 hover:text-gray-600 font-semibold"
            }`}
            id="tab-btn-rewards"
          >
            <div className="relative">
              <Coins className="w-5.5 h-5.5 text-yellow-500" />
              <span className="absolute -top-1 -right-2 bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold text-[8px] px-1 rounded-full border border-white">
                Earn
              </span>
            </div>
            <span className="text-[10px] tracking-tight whitespace-nowrap block">सिक्के ({coins})</span>
          </button>

          {/* Tab 3: Quick Billing / Calculator */}
          <button 
            onClick={() => setActiveTab("billing")}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition ${
              activeTab === "billing" 
                ? "text-orange-600 font-extrabold" 
                : "text-gray-400 hover:text-gray-600 font-semibold"
            }`}
            id="tab-btn-billing"
          >
            <Calculator className="w-5.5 h-5.5" />
            <span className="text-[10px] tracking-tight whitespace-nowrap block">बिल (Bill)</span>
          </button>

          {/* Tab 4: About info */}
          <button 
            onClick={() => setActiveTab("about")}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition ${
              activeTab === "about" 
                ? "text-orange-600 font-extrabold" 
                : "text-gray-400 hover:text-gray-600 font-semibold"
            }`}
            id="tab-btn-about"
          >
            <HelpCircle className="w-5.5 h-5.5" />
            <span className="text-[10px] tracking-tight whitespace-nowrap block">सम्पर्क (Info)</span>
          </button>

        </div>
      </nav>

      {/* Desktop Helper Tabs Selector bar (Optional floating top selector for widescreen users to experience App view) */}
      <div className="hidden sm:flex fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-orange-100 p-1.5 items-center gap-2 z-45">
        <button
          onClick={() => setActiveTab("shop")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition text-xs font-bold leading-none cursor-pointer ${
            activeTab === "shop" ? "bg-orange-500 text-white shadow-sm" : "text-gray-600 hover:bg-orange-50"
          }`}
          id="dt-tab-shop"
        >
          <Store className="w-4 h-4" /> Shop Catalog
        </button>
        <button
          onClick={() => setActiveTab("rewards")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition text-xs font-bold leading-none cursor-pointer ${
            activeTab === "rewards" ? "bg-orange-500 text-white shadow-sm" : "text-gray-600 hover:bg-orange-50"
          }`}
          id="dt-tab-rewards"
        >
          <Coins className="w-4 h-4 text-yellow-500" /> Reward Coins ({coins})
        </button>
        <button
          onClick={() => setActiveTab("billing")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition text-xs font-bold leading-none cursor-pointer ${
            activeTab === "billing" ? "bg-orange-500 text-white shadow-sm" : "text-gray-600 hover:bg-orange-50"
          }`}
          id="dt-tab-billing"
        >
          <Calculator className="w-4 h-4" /> Billing Counter & Calc
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition text-xs font-bold leading-none cursor-pointer ${
            activeTab === "about" ? "bg-orange-500 text-white shadow-sm" : "text-gray-600 hover:bg-orange-50"
          }`}
          id="dt-tab-about"
        >
          <HelpCircle className="w-4 h-4" /> Help & About Owner
        </button>
      </div>

      {/* 4. Grocery checkout Drawer panel side menu */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* 5. Persistent WhatsApp visual floating speed dial */}
      <FloatingWhatsApp />

      {/* 6. Footer section (Renders only if about section is selected, or fits nicely at standard shop bottom) */}
      <Footer 
        onNavigateSection={handleNavigateSection}
        setActiveCategory={(cat) => {
          setActiveTab("shop");
          setActiveCategory(cat);
          setTimeout(() => {
            document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
      />

    </div>
  );
}
