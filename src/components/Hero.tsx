import React from "react";
import { motion } from "motion/react";
import { ShoppingBag, PhoneCall, CheckCircle, Sparkles, Truck, Award } from "lucide-react";
import { STORE_INFO } from "../data";

interface HeroProps {
  onShopNowClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ onShopNowClick, onContactClick }: HeroProps) {
  return (
    <section id="hero" className="relative bg-gradient-to-b from-orange-50 via-amber-50/40 to-white pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      
      {/* Sun Background Radiance Aura */}
      <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-yellow-400/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-15%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-orange-400/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Tag / Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-orange-200/30 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              Trusted Neighborhood Supermarket
            </motion.div>

            {/* Glowing Main Heading */}
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-gray-950 tracking-tight leading-[1.1] mb-6">
              Your Daily Needs &{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 font-extrabold">
                Puja Samagri,
                <span className="absolute bottom-1.5 left-0 w-full h-[6px] md:h-[8px] bg-yellow-300 -z-10 rounded-full opacity-65"></span>
              </span>{" "}
              in One Safe Place
            </h2>

            {/* Tagline */}
            <p className="font-sans text-base sm:text-lg text-gray-700 max-w-xl mb-8 leading-relaxed font-medium">
              "{STORE_INFO.tagline}"
            </p>

            {/* Actions CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
              <button
                onClick={onShopNowClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-bold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                id="hero-cta-shop-now"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Fresh Groceries
              </button>
              <button
                onClick={onContactClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-bold text-orange-600 bg-white hover:bg-orange-50/50 border border-orange-200 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                id="hero-cta-contact-us"
              >
                <PhoneCall className="w-5 h-5" />
                Contact Us
              </button>
            </div>

            {/* Micro value badges */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 w-full max-w-lg border-t border-orange-100/60 pt-8 text-left">
              <div className="flex items-start gap-2.5">
                <div className="p-1 px-1.5 rounded-lg bg-orange-100/60 text-orange-600 mt-0.5 shrink-0">
                  <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-gray-900">100% Quality</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Sourced with care</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1 px-1.5 rounded-lg bg-yellow-105 text-yellow-700 mt-0.5 shrink-0">
                  <Truck className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-gray-900">Fast Delivery</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Direct to doorstep</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1 px-1.5 rounded-lg bg-amber-100 text-amber-700 mt-0.5 shrink-0">
                  <Award className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-gray-900">Best Rates</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Local trusted price</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Splendor */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div className="relative w-full max-w-[380px] sm:max-w-[450px]">
              
              {/* Decorative behind elements */}
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300 to-orange-400 rounded-full scale-100 opacity-20 blur-md -z-10 animate-pulse"></div>
              
              {/* Large Premium Supermarket Montage Framing */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-3xl border-4 border-white bg-white shadow-2xl p-3 aspect-[12/11] flex items-center justify-center overflow-hidden relative group"
              >
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
                  alt="Surya Kirana Store Grocery Selection"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-102 transition-transform duration-700 referrer-policy"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded Floating Badges */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-orange-600 font-display font-bold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-orange-100">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                  Store Open Today
                </span>

                <div className="absolute bottom-4 right-4 bg-orange-600 text-white font-display font-extrabold text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-1.5">
                  ⭐ 4.9 Premium Rating
                </div>
              </motion.div>

              {/* Smaller overlay: Puja item */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-8 -left-8 md:-left-12 w-[150px] md:w-[180px] rounded-2xl border-4 border-white bg-white shadow-xl overflow-hidden p-2 group"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=400"
                    alt="Authentic Puja Samagri"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 referrer-policy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center pb-1">
                  <h5 className="font-display font-bold text-xs text-gray-900 leading-tight">Shudh Puja Samagri</h5>
                  <p className="text-[10px] text-amber-600 font-semibold mt-0.5">Starting at ₹15</p>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
