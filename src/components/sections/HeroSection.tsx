"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=90",
    title: "Bali Paradise",
    subtitle: "Pulau Dewata yang Memukau",
  },
  {
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1920&q=90",
    title: "Istanbul & Cappadocia",
    subtitle: "Keajaiban Dua Benua",
  },
  {
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=90",
    title: "Jepang Sakura",
    subtitle: "Negeri Matahari Terbit",
  },
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${heroSlides[activeSlide].image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple/80 via-purple/60 to-purple/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple/40 to-transparent" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-magenta/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-ocean/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-7xl pt-36 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm font-medium font-inter">
              {t.hero.badge}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-poppins leading-tight mb-4">
            {t.hero.title1}{" "}
            <span className="text-ocean">{t.hero.title2}</span>
            <br />
            <span className="text-magenta">{t.hero.title3}</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl font-inter mb-8 max-w-xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link href="/open-trip" className="btn-primary text-base py-3.5 px-8 inline-flex items-center gap-2">
              {language === "en" ? "View Open Trip" : "Lihat Open Trip"}
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href="/private-trip" className="btn-outline-white text-base py-3.5 px-8 inline-flex items-center gap-2">
              Private Trip
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { value: "15,000+", label: t.hero.happyTravelers },
              { value: "50+", label: t.hero.destinations },
              { value: "10+", label: t.hero.yearsExperience },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white font-poppins">{stat.value}</p>
                <p className="text-white/60 text-sm font-inter">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>


      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              activeSlide === index ? "w-8 h-3 bg-magenta" : "w-3 h-3 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Current Slide Info */}
      <div className="absolute bottom-8 left-8 text-white/60">
        <p className="text-xs font-inter">{heroSlides[activeSlide].title}</p>
        <p className="text-xs font-inter">{heroSlides[activeSlide].subtitle}</p>
      </div>
    </section>
  );
}
