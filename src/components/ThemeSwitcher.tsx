import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Leaf, Moon, Sparkles, Palette, Check } from "lucide-react";

interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: "gold",
      name: "Sunlight Gold",
      hindiName: "सूर्योदय",
      colorClass: "from-amber-400 to-orange-500",
      icon: Sun,
      iconColor: "text-amber-500",
      textColor: "text-orange-700"
    },
    {
      id: "emerald",
      name: "Organic Emerald",
      hindiName: "हरियाली",
      colorClass: "from-emerald-400 to-teal-500",
      icon: Leaf,
      iconColor: "text-emerald-500",
      textColor: "text-emerald-700"
    },
    {
      id: "midnight",
      name: "Velvet Midnight",
      hindiName: "सांझ (Dark)",
      colorClass: "from-indigo-650 to-slate-900",
      icon: Moon,
      iconColor: "text-indigo-400",
      textColor: "text-slate-350"
    },
    {
      id: "rose",
      name: "Royal Rose",
      hindiName: "सिंदूरी",
      colorClass: "from-rose-400 to-pink-500",
      icon: Sparkles,
      iconColor: "text-rose-500",
      textColor: "text-rose-700"
    }
  ];

  const currentThemeData = themes.find((t) => t.id === currentTheme) || themes[0];

  return (
    <div className="fixed bottom-20 left-6 sm:bottom-6 sm:left-6 z-45 flex flex-col items-start gap-3 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-orange-100 dark:border-slate-800 rounded-3xl p-3 shadow-2xl flex flex-col gap-2 pointer-events-auto max-w-[210px] w-48 text-left"
          >
            <div className="px-2 py-1.5 border-b border-orange-50 dark:border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 block">
                चुनें थीम (Select Theme)
              </span>
            </div>
            
            <div className="flex flex-col gap-1">
              {themes.map((theme) => {
                const IconComponent = theme.icon;
                const isSelected = currentTheme === theme.id;
                
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onThemeChange(theme.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between w-full p-2 rounded-xl transition-all cursor-pointer group text-left ${
                      isSelected 
                        ? "bg-orange-50 dark:bg-slate-800 font-extrabold text-orange-650 dark:text-orange-400" 
                        : "hover:bg-gray-50 dark:hover:bg-slate-800/50 text-gray-700 dark:text-slate-300 font-semibold"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-xs group-hover:scale-105 transition-transform ${theme.iconColor}`}>
                        <IconComponent className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs leading-none">{theme.hindiName}</span>
                        <span className="text-[9px] text-gray-400 dark:text-slate-500 font-medium mt-0.5">{theme.name}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-orange-550 dark:text-orange-400 stroke-[3]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-orange-500/25 pointer-events-auto transform hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer relative group focus:outline-none"
        title="बदलें थीम (Change Design Theme)"
        id="btn-theme-switcher"
      >
        <span className="absolute inset-0 bg-amber-400 rounded-full scale-100 opacity-20 animate-ping group-hover:scale-105"></span>
        <Palette className="w-6 h-6 stroke-[2.2] animate-pulse" />
      </button>
    </div>
  );
}
