import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Tag, Copy, Check, X } from "lucide-react";
import { PROMO_OFFERS } from "../data";

export default function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_OFFERS.length);
    }, 7000); // Rotate every 7 seconds
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!isVisible) return null;

  const currentOffer = PROMO_OFFERS[currentIndex];

  return (
    <div className="relative bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-600 text-white z-50 overflow-hidden shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Side: Offer */}
        <div className="flex-1 flex items-center justify-center sm:justify-start gap-2.5 text-sm font-medium">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="hidden xs:flex bg-white/20 p-1 rounded-full text-yellow-250 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
          </motion.div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span className="bg-white/20 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider border border-white/30 self-center sm:self-auto shrink-0">
              {currentOffer.discount}
            </span>
            <span className="font-display tracking-tight text-white/95">
              <strong>{currentOffer.title}:</strong> {currentOffer.subtitle}
            </span>
          </div>
        </div>

        {/* Right Side Code & Control */}
        <div className="flex items-center gap-4 shrink-0 font-sans text-xs">
          <div className="hidden md:flex items-center gap-1.5 bg-black/15 hover:bg-black/25 px-2.5 py-1 rounded-md border border-white/25 transition">
            <Tag className="w-3.5 h-3.5 text-amber-200" />
            <span className="text-[10px] uppercase font-bold text-white/90">Code:</span>
            <code className="font-mono text-yellow-200 font-bold tracking-wider">{currentOffer.code}</code>
            <button
              onClick={() => copyToClipboard(currentOffer.code)}
              className="ml-1.5 focus:outline-none text-white/80 hover:text-white transition"
              title="Copy Coupon Code"
              id={`btn-copy-${currentOffer.id}`}
            >
              {copied === currentOffer.code ? (
                <Check className="w-3.5 h-3.5 text-green-300" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition focus:outline-none"
            title="Dismiss Offer"
            id="btn-dismiss-promo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
