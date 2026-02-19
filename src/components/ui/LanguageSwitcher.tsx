"use client";

import { useLanguage } from "@/i18n/LanguageContext";

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

export default function LanguageSwitcher({ isScrolled = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center gap-1 rounded-lg p-1 ${isScrolled ? "bg-gray-100" : "bg-white/10"}`}>
      <button
        onClick={() => setLanguage("id")}
        className={`px-2.5 py-1 rounded-md text-xs font-semibold font-poppins transition-all duration-200 ${
          language === "id"
            ? "bg-magenta text-white shadow-sm"
            : isScrolled
              ? "text-gray-600 hover:text-gray-900"
              : "text-white/80 hover:text-white"
        }`}
      >
        ID
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 rounded-md text-xs font-semibold font-poppins transition-all duration-200 ${
          language === "en"
            ? "bg-magenta text-white shadow-sm"
            : isScrolled
              ? "text-gray-600 hover:text-gray-900"
              : "text-white/80 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
