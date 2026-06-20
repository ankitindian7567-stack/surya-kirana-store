import React, { useState, useEffect } from "react";
import { MessageCircleHeart, PhoneCall, Sparkles } from "lucide-react";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tool tip after 4 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleFloatingClick = () => {
    const defaultText = encodeURIComponent(
      "नमस्ते Surya Kirana Store! I am visiting your premium storefront website and would like to order groceries or ask about Puja items."
    );
    window.open(`https://wa.me/917004410152?text=${defaultText}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      
      {/* Tooltip bubble prompt */}
      {showTooltip && (
        <div 
          onClick={handleFloatingClick}
          className="bg-white text-gray-900 border border-orange-100 text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 pointer-events-auto cursor-pointer max-w-xs animate-bounce animate-duration-1000 group"
          id="whatsapp-tooltip-bubble"
        >
          <div className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span className="block italic text-gray-700 leading-tight">
            Order grocery or ask prices on <strong className="text-green-600 font-extrabold font-sans">WhatsApp</strong>!
          </span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-gray-400 hover:text-gray-600 text-[10px] ml-1 shrink-0 font-bold"
            title="Close Tooltip"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Circle Button */}
      <button
        onClick={handleFloatingClick}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-green-500/35 transition-all duration-300 pointer-events-auto transform hover:scale-110 cursor-pointer relative group active:scale-95 focus:outline-none"
        id="btn-whatsapp-floating"
      >
        {/* Glow pulsing aura */}
        <span className="absolute inset-0 bg-green-400 rounded-full scale-100 opacity-20 animate-ping group-hover:scale-105"></span>
        
        {/* Simple customized svg representing modern messaging feel */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 fill-current stroke-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm12.072-2.1c1.803 0 3.567-.48 5.114-1.39l.366-.217 3.807 1.002-1.01-3.712.238-.38c.997-1.588 1.524-3.425 1.521-5.31C22.164 6.84 17.6 2.276 12.01 2.276c-2.7 0-5.239 1.053-7.15 2.968C2.95 7.154 1.897 9.697 1.898 12.4c.002 5.514 4.56 10.078 10.15 10.078h.081zm5.539-7.575c-.302-.152-1.791-.885-2.073-.988-.283-.103-.49-.153-.695.152-.205.305-.795.989-.974 1.193-.18.204-.359.23-.661.077-.302-.151-1.275-.47-2.428-1.498-.897-.8-1.502-1.787-1.678-2.09-.176-.302-.019-.465.132-.614.136-.134.302-.352.453-.529.151-.176.202-.293.302-.49.101-.196.05-.367-.025-.519-.075-.152-.695-1.673-.951-2.29-.25-.599-.503-.518-.691-.527-.18-.009-.385-.011-.59-.011-.205 0-.539.077-.821.385-.282.308-1.078 1.054-1.078 2.57 0 1.517 1.102 2.984 1.256 3.19.153.204 2.169 3.312 5.253 4.643.734.317 1.307.507 1.753.649.738.234 1.41.201 1.942.122.593-.088 1.791-.733 2.047-1.41.256-.677.256-1.256.18-1.378-.076-.122-.283-.197-.585-.349z"/>
        </svg>

      </button>
    </div>
  );
}
