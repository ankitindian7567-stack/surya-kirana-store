import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Search, ShoppingCart, Menu, X, Phone, ShoppingBag, MapPin } from "lucide-react";
import { STORE_INFO } from "../data";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  onCartClick: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function Navbar({
  searchQuery,
  setSearchQuery,
  cartCount,
  onCartClick,
  onNavigateSection
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Categories", id: "categories" },
    { name: "Featured", id: "featured" },
    { name: "Why Choose Us", id: "why-choose-us" },
    { name: "Reviews", id: "reviews" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full shrink-0">
      {/* Top micro-bar: Info */}
      <div className="bg-amber-50 text-amber-900 border-b border-amber-100 hidden sm:block text-xs font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              Call us: <a href={`tel:${STORE_INFO.phone}`} className="hover:text-orange-600 transition font-semibold">{STORE_INFO.phone}</a>
            </span>
            <span className="flex items-center gap-1.5 text-amber-800">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              {STORE_INFO.address.split(",")[0]}, {STORE_INFO.address.split(",")[3]}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              ⚡ Safe Hand Picked Grocery
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-orange-100/70 shadow-xs px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo with interactive Sun hover */}
          <div 
            onClick={() => handleNavClick("hero")} 
            className="flex items-center gap-2 cursor-pointer group shrink-0"
            id="brand-logo"
          >
            <div className="relative bg-gradient-to-tr from-orange-500 to-yellow-400 p-2 rounded-xl shadow-md group-hover:scale-105 transition-all duration-300">
              <Sun className="w-6 h-6 text-white stroke-[2.5]" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-white/40 rounded-xl"
              ></motion.div>
            </div>
            <div>
              <h1 className="font-display font-extrabold text-xl tracking-tight leading-none bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Surya
              </h1>
              <span className="font-sans font-semibold text-[10px] text-orange-500 tracking-widest uppercase block mt-0.5">
                Kirana Store
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 transition duration-150 cursor-pointer"
                id={`nav-${link.id}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Search bar inside header */}
          <div className="flex-1 max-w-xs md:max-w-sm relative hidden sm:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rice, ghee, puja accessories..."
              className="w-full pl-9 pr-4 py-1.5 sm:py-2 text-sm bg-amber-50/40 text-gray-800 border border-orange-100 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:bg-white placeholder-gray-400 transition"
              id="desktop-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                title="Clear Search"
                id="btn-clear-search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right End Actions (Cart & Mobile Hamburger Toggle) */}
          <div className="flex items-center gap-2.5">
            {/* Shopping Cart button */}
            <button
              onClick={onCartClick}
              className="relative p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 transition-all duration-200 cursor-pointer group"
              title="Open Grocery Basket"
              id="btn-navbar-cart"
            >
              <ShoppingCart className="w-5.5 h-5.5 transition-transform duration-200 group-hover:scale-105" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white font-extrabold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Action button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition"
              title="Toggle Menu"
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Small screen Live Search Input */}
        <div className="mt-2.5 block sm:hidden relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search groceries & puja samagri..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-amber-50/40 text-gray-800 border border-orange-100 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:bg-white placeholder:text-gray-400 transition"
            id="mobile-search-input"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-650"
              title="Clear Search"
              id="btn-clear-search-mobile"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-orange-100 shadow-md block"
          >
            <div className="px-4 pt-2 pb-5 space-y-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition"
                  id={`nav-mob-${link.id}`}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-2 border-t border-orange-50">
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 hover:text-orange-600 rounded-lg text-sm font-semibold transition"
                  id="nav-mob-call"
                >
                  <Phone className="w-4 h-4 text-orange-500" />
                  Call Store: {STORE_INFO.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
