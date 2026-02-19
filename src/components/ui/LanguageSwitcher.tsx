"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
      <button
        onClick={() => setLanguage("id")}
        className={`px-2.5 py-1 rounded-md text-xs font-semibold font-poppins transition-all duration-200 ${
          language === "id"
            ? "bg-magenta text-white shadow-sm"
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
            : "text-white/80 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
