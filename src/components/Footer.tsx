import React from "react";
import { Sun, Phone, Mail, MapPin, SpaceIcon, Globe, Heart } from "lucide-react";
import { STORE_INFO, CATEGORIES } from "../data";

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  setActiveCategory: (catId: string) => void;
}

export default function Footer({ onNavigateSection, setActiveCategory }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleCategoryFooterClick = (catId: string) => {
    setActiveCategory(catId);
    onNavigateSection("featured");
  };

  return (
    <footer className="bg-gradient-to-t from-gray-950 to-gray-900 text-gray-300 border-t border-orange-500/10">
      
      {/* Upper Footer Segment */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Brand Block */}
        <div className="col-span-1 md:col-span-4 flex flex-col items-start space-y-4">
          <div 
            onClick={() => onNavigateSection("hero")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="bg-gradient-to-tr from-orange-500 to-yellow-400 p-1.5 rounded-lg shadow-md">
              <Sun className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg text-white leading-none">
                Surya Kirana Store
              </h2>
              <span className="text-[9px] font-sans font-bold text-orange-550 uppercase tracking-widest block mt-0.5">
                Everyday Staples & Puja Samagri
              </span>
            </div>
          </div>
          
          <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-sm">
            "{STORE_INFO.tagline}"
            We represent Gandhinagar's trusted address for 100% adulteration-free rice, pure cow ghee, and divine organic incense sticks.
          </p>

          {/* Social Links Icons */}
          <div className="flex items-center gap-3.5 pt-2">
            <a 
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white flex items-center justify-center transition"
              title="Facebook Profile Page"
              id="footer-social-fb"
            >
              <span className="font-bold text-xs">Fb</span>
            </a>
            <a 
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white flex items-center justify-center transition"
              title="Instagram Feed Page"
              id="footer-social-ig"
            >
              <span className="font-bold text-xs">Ig</span>
            </a>
            <a 
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white flex items-center justify-center transition"
              title="Twitter Handle Page"
              id="footer-social-tw"
            >
              <span className="font-bold text-xs">X</span>
            </a>
            <a 
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white flex items-center justify-center transition"
              title="Youtube Shop tour video"
              id="footer-social-yt"
            >
              <span className="font-bold text-xs">Yt</span>
            </a>
          </div>
        </div>

        {/* Quick Links Blocks */}
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button 
                onClick={() => onNavigateSection("hero")}
                className="hover:text-amber-400 transition cursor-pointer font-medium"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateSection("about")}
                className="hover:text-amber-400 transition cursor-pointer font-medium"
              >
                About Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateSection("categories")}
                className="hover:text-amber-400 transition cursor-pointer font-medium"
              >
                Categories
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateSection("featured")}
                className="hover:text-amber-400 transition cursor-pointer font-medium"
              >
                Featured Shelf
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateSection("reviews")}
                className="hover:text-amber-400 transition cursor-pointer font-medium"
              >
                Customer Reviews
              </button>
            </li>
          </ul>
        </div>

        {/* Category specific direct link routes */}
        <div className="col-span-1 md:col-span-3">
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
            Departments
          </h4>
          <ul className="space-y-2.5 text-xs">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryFooterClick(cat.id)}
                  className="hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left"
                  id={`footer-cat-${cat.id}`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-gray-500 font-hindi">{cat.hindiName}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Store Contacts & Info block */}
        <div className="col-span-1 md:col-span-3 space-y-4 text-xs font-sans">
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-1">
            Store Info
          </h4>
          
          <div className="flex gap-2.5 items-start">
            <Phone className="w-4 h-4 text-orange-500 shrink-0" />
            <a href={`tel:${STORE_INFO.phone}`} className="hover:text-white transition">
              {STORE_INFO.phone}
            </a>
          </div>

          <div className="flex gap-2.5 items-start">
            <Mail className="w-4 h-4 text-orange-500 shrink-0" />
            <a href={`mailto:${STORE_INFO.email}`} className="hover:text-white transition">
              {STORE_INFO.email}
            </a>
          </div>

          <div className="flex gap-2.5 items-start leading-relaxed">
            <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
            <span className="text-gray-400 leading-normal">{STORE_INFO.address}</span>
          </div>
        </div>

      </div>

      {/* Under micro-row */}
      <div className="bg-gray-950/80 py-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Surya Kirana Store. All Rights Reserved. Shop Owner: <strong className="text-orange-500 font-bold">{STORE_INFO.owner}</strong> ({STORE_INFO.phone})</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for community nutrition and values.
          </p>
        </div>
      </div>

    </footer>
  );
}
