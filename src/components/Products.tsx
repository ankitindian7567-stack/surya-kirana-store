import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingBasket, Plus, Minus, Star, Heart, CheckCircle2, AlertTriangle, Eye, Sparkles, X } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "../data";
import { Product, CartItem } from "../types";

interface ProductsProps {
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (product: Product) => void;
}

export default function Products({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  cartItems,
  onAddToCart,
  onRemoveFromCart
}: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Toggle favorite helper
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Memoized filter list of products based on category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
        
      // Search match (checks product title, Hindi title, and descriptions)
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.hindiName && product.hindiName.includes(searchQuery)) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Get quantity helper for products already configured in cart
  const getProductQuantity = (productId: string) => {
    const found = cartItems.find((item) => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  return (
    <section id="featured" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and control bar */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
          <div>
            <span className="text-orange-500 font-display font-extrabold text-sm uppercase tracking-wider block mb-2">
              Our Curated Shelf
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-950 tracking-tight leading-none">
              {activeCategory === "all"
                ? "All Supermarket Staples Map"
                : `${CATEGORIES.find((c) => c.id === activeCategory)?.name || ""} Selection`}
            </h2>
            <p className="text-sm text-gray-500 mt-2.5 max-w-xl">
              Fresh quality ingredients checked under strict supervision. Standard weights are sealed and verified for your absolute assurance.
            </p>
          </div>

          {/* Quick Sub-Category filter tabs inside Products shelf */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full font-display font-bold text-xs uppercase tracking-wider transition ${
                activeCategory === "all"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-display font-bold text-xs uppercase tracking-wider transition ${
                  activeCategory === cat.id
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Searching Status Indicator */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-amber-50 border border-orange-100 rounded-xl p-4 text-sm text-amber-900">
            <span>
              Showing results for search: <strong>"{searchQuery}"</strong> ({filteredProducts.length} items found)
            </span>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 underline focus:outline-none cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-orange-50/20 rounded-3xl border border-dashed border-orange-100/50 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="font-display font-bold text-lg text-gray-900">No Grocery Items Match Your Query</h3>
            <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto">
              We might have this stock offline! Please search with another keyword or request this product directly via WhatsApp.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-5 px-5 py-2 rounded-xl text-xs font-bold bg-orange-500 text-white hover:bg-orange-600 transition cursor-pointer"
            >
              Reset Search Filter
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const quantity = getProductQuantity(p.id);
            const isFavorite = favorites.includes(p.id);
            const discountPercentage = p.originalPrice
              ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
              : 0;

            return (
              <motion.div
                key={p.id}
                layoutId={`product-card-${p.id}`}
                className="relative bg-white rounded-3xl p-4 border border-orange-100/40 shadow-xs hover:border-orange-200 hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Labels/Badges Top Header */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                  {discountPercentage > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg shadow-sm">
                      -{discountPercentage}%
                    </span>
                  )}
                  {p.isBestSeller && (
                    <span className="bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Best Seller
                    </span>
                  )}
                </div>

                {/* Favorite Heart action */}
                <button
                  onClick={(e) => toggleFavorite(p.id, e)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/95 backdrop-blur-md text-gray-400 hover:text-red-500 shadow-sm transition border border-gray-100 focus:outline-none"
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 transition ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </button>

                {/* Image Section */}
                <div 
                  onClick={() => setSelectedProduct(p)}
                  className="relative aspect-square w-full rounded-2xl bg-amber-50/20 overflow-hidden mb-4 cursor-pointer group-hover:scale-102 transition-transform duration-300"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover rounded-2xl referrer-policy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(p);
                      }}
                      className="bg-white/95 text-gray-900 border border-gray-100 p-2.5 rounded-full hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-200 shadow-lg font-bold flex items-center justify-center gap-1.5 focus:outline-none text-xs px-4"
                    >
                      <Eye className="w-4 h-4" /> Quick View
                    </button>
                  </div>
                </div>

                {/* Card description details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unit & Stars Row */}
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-0.5 rounded-lg">
                        {p.unit}
                      </span>
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {p.rating}
                      </span>
                    </div>

                    {/* Hindi subtitle flag if appropriate */}
                    {p.hindiName && (
                      <span className="text-[11px] block font-display text-orange-600 font-semibold mb-0.5 tracking-wide">
                        {p.hindiName}
                      </span>
                    )}

                    {/* Product Name */}
                    <h4 
                      onClick={() => setSelectedProduct(p)}
                      className="font-display font-extrabold text-base text-gray-950 line-clamp-2 hover:text-orange-500 transition cursor-pointer mb-2"
                    >
                      {p.name}
                    </h4>
                  </div>

                  {/* Weight, Price and Dynamic CTA Dial */}
                  <div className="mt-4 pt-3.5 border-t border-orange-50/50 flex items-center justify-between">
                    <div>
                      {p.originalPrice && (
                        <span className="text-[11px] text-gray-400 line-through block leading-none mb-1">
                          ₹{p.originalPrice}
                        </span>
                      )}
                      <span className="font-display font-black text-lg text-gray-950 leading-none">
                        ₹{p.price}
                      </span>
                    </div>

                    {/* Quantity dial control triggers */}
                    {quantity > 0 ? (
                      <div className="flex items-center bg-orange-500 text-white rounded-xl shadow-md overflow-hidden">
                        <button
                          onClick={() => onRemoveFromCart(p)}
                          className="px-2.5 py-1.5 hover:bg-orange-600 active:bg-orange-700 transition font-bold"
                          title="Reduce"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                        <span className="px-2.5 font-display font-bold text-sm min-w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onAddToCart(p)}
                          className="px-2.5 py-1.5 hover:bg-orange-600 active:bg-orange-700 transition font-bold"
                          title="Add more"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(p)}
                        className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-500 hover:text-white text-orange-600 transition-all duration-200 border border-orange-100 group-hover:border-transparent font-semibold text-xs flex items-center gap-1.5 focus:outline-none cursor-pointer"
                        id={`btn-add-cart-${p.id}`}
                      >
                        <ShoppingBasket className="w-4 h-4" /> Add
                      </button>
                    )}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Quick View Dialog / Modal Frame */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              >
                {/* Close Button top-right */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition focus:outline-none"
                  title="Close Dialog"
                  id="btn-close-modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {/* Left: Product Image */}
                  <div className="relative aspect-square w-full rounded-2xl bg-amber-50/20 overflow-hidden border border-orange-50">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover rounded-2xl referrer-policy"
                      referrerPolicy="no-referrer"
                    />
                    {selectedProduct.isBestSeller && (
                      <span className="absolute top-4 left-4 bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg">
                        Best Seller
                      </span>
                    )}
                  </div>

                  {/* Right: Product Details */}
                  <div className="flex flex-col justify-between">
                    <div>
                      {/* Department / Category Tag */}
                      <span className="bg-orange-50 border border-orange-100 text-orange-600 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md inline-block mb-3">
                        {CATEGORIES.find((c) => c.id === selectedProduct.category)?.name}
                      </span>

                      {/* Hindi Label */}
                      {selectedProduct.hindiName && (
                        <p className="font-display font-bold text-sm text-orange-600 mb-1 leading-none">
                          {selectedProduct.hindiName}
                        </p>
                      )}

                      {/* Title */}
                      <h3 className="font-display font-extrabold text-xl text-gray-950 mb-2">
                        {selectedProduct.name}
                      </h3>

                      {/* Stars count */}
                      <div className="flex items-center gap-1 mb-4 text-sm text-amber-500 font-bold">
                        <Star className="w-4 h-4 fill-current text-amber-400" />
                        <span>{selectedProduct.rating} / 5.0 Rating</span>
                        <span className="text-gray-450 font-normal ml-1">(Local Customer Verified)</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                        {selectedProduct.description}
                      </p>

                      {/* Specs badges */}
                      <div className="grid grid-cols-2 gap-2.5 mb-6">
                        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-center">
                          <span className="block text-[10px] text-gray-450 uppercase font-semibold">Standard Pack</span>
                          <span className="font-bold text-xs text-gray-800">{selectedProduct.unit}</span>
                        </div>
                        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-center">
                          <span className="block text-[10px] text-gray-450 uppercase font-semibold">Available State</span>
                          <span className="font-bold text-xs text-green-600 flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Weight and Action buttons bottom row */}
                    <div className="pt-4 border-t border-orange-100 flex items-center justify-between">
                      <div>
                        {selectedProduct.originalPrice && (
                          <span className="text-xs text-gray-400 line-through block mb-0.5">
                            ₹{selectedProduct.originalPrice}
                          </span>
                        )}
                        <span className="font-display font-black text-2xl text-gray-950 leading-none">
                          ₹{selectedProduct.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {getProductQuantity(selectedProduct.id) > 0 ? (
                          <div className="flex items-center bg-orange-500 text-white rounded-xl shadow-md overflow-hidden">
                            <button
                              onClick={() => onRemoveFromCart(selectedProduct)}
                              className="px-3.5 py-2.5 hover:bg-orange-600 active:bg-orange-700 transition font-bold"
                              title="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5 stroke-[3]" />
                            </button>
                            <span className="px-3 font-display font-bold text-sm min-w-6 text-center">
                              {getProductQuantity(selectedProduct.id)}
                            </span>
                            <button
                              onClick={() => onAddToCart(selectedProduct)}
                              className="px-3.5 py-2.5 hover:bg-orange-600 active:bg-orange-700 transition font-bold"
                              title="Increase"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[3]" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => onAddToCart(selectedProduct)}
                            className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs tracking-wide shadow-md transition-all flex items-center gap-2 cursor-pointer focus:outline-none"
                            id="btn-modal-add"
                          >
                            <ShoppingBasket className="w-4 h-4" /> Add To Shopping List
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
