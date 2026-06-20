import React from "react";
import { motion } from "motion/react";
import { ShoppingBag, Sparkles, Coffee, Milk, Home, ArrowRight } from "lucide-react";
import { CATEGORIES } from "../data";
import { Category } from "../types";

interface CategoriesProps {
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  onCategorySelected: () => void;
}

export default function Categories({
  activeCategory,
  setActiveCategory,
  onCategorySelected
}: CategoriesProps) {
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShoppingBag":
        return <ShoppingBag className="w-6 h-6 stroke-[2]" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 stroke-[2]" />;
      case "Coffee":
        return <Coffee className="w-6 h-6 stroke-[2]" />;
      case "Milk":
        return <Milk className="w-6 h-6 stroke-[2]" />;
      case "Home":
        return <Home className="w-6 h-6 stroke-[2]" />;
      default:
        return <ShoppingBag className="w-6 h-6 stroke-[2]" />;
    }
  };

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    onCategorySelected();
  };

  return (
    <section id="categories" className="py-16 md:py-24 bg-amber-50/20 border-y border-orange-100/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-orange-600 font-display font-extrabold text-sm uppercase tracking-wider block mb-2"
          >
            Diverse Department Offerings
          </motion.span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-950 tracking-tight leading-tight">
            Explore Handpicked Categories
          </h2>
          <p className="text-gray-650 text-sm sm:text-base mt-2">
            Select a specialty department to view fresh items, custom packaging options, and exclusive local deals.
          </p>
        </div>

        {/* Carousel / Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, i) => {
            const isSelected = activeCategory === cat.id;
            
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => handleSelectCategory(cat.id)}
                className={`relative group rounded-2xl p-5 overflow-hidden border cursor-pointer transition-all duration-300 flex flex-col justify-between aspect-square select-none ${
                  isSelected
                    ? "bg-gradient-to-br from-orange-500 to-amber-500 border-transparent text-white shadow-lg shadow-orange-500/25"
                    : "bg-white border-orange-100/60 text-gray-900 shadow-xs hover:border-orange-300 hover:shadow-md hover:shadow-orange-500/5 hover:-translate-y-1"
                }`}
                id={`cat-card-${cat.id}`}
              >
                
                {/* Background Visual Card Image decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full referrer-policy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Top Row: Icon Container and Hindi Name */}
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl transition ${
                    isSelected 
                      ? "bg-white/20 text-white" 
                      : "bg-orange-50 text-orange-600 group-hover:bg-orange-150"
                  }`}>
                    {getIcon(cat.icon)}
                  </div>
                  {cat.hindiName && (
                    <span className={`font-display text-xs font-semibold px-2 py-0.5 rounded-md ${
                      isSelected ? "bg-white/20 text-yellow-100" : "bg-orange-50 text-orange-600 font-medium"
                    }`}>
                      {cat.hindiName}
                    </span>
                  )}
                </div>

                {/* Content block: Title and description */}
                <div className="mt-6">
                  <h4 className="font-display font-extrabold text-base tracking-tight mb-2">
                    {cat.name}
                  </h4>
                  <p className={`text-xs leading-relaxed line-clamp-3 mb-4 transition ${
                    isSelected ? "text-orange-50" : "text-gray-500"
                  }`}>
                    {cat.description}
                  </p>
                  
                  {/* Text link indicator */}
                  <div className={`flex items-center gap-1.5 text-xs font-bold transition-all ${
                    isSelected 
                      ? "text-yellow-250 translate-x-1" 
                      : "text-orange-600 group-hover:text-orange-850 group-hover:translate-x-1"
                  }`}>
                    Browse Department
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Global Reset Toggle */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => handleSelectCategory("all")}
            className={`px-6 py-2.5 rounded-full font-display font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
              activeCategory === "all"
                ? "bg-orange-500 text-white shadow-md border border-transparent"
                : "bg-white text-gray-700 border border-orange-100 hover:border-orange-300 hover:bg-orange-50/40"
            }`}
            id="cat-btn-all"
          >
            {activeCategory === "all" ? "⚡ Displaying All Offerings" : "View All Products & Packs"}
          </button>
        </div>

      </div>
    </section>
  );
}
