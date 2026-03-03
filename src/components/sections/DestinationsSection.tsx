"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface Destination {
  id: string;
  name: string;
  nameEn?: string;
  country: string;
  countryEn?: string;
  category: string;
  image: string;
  packageCount: number;
}

export default function DestinationsSection() {
  const { language } = useLanguage();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/destinations")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDestinations(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block text-magenta font-semibold text-sm font-inter uppercase tracking-wider mb-3">
              {language === "en" ? "Popular Destinations" : "Destinasi Populer"}
            </span>
            <h2 className="section-title">
              {language === "en" ? "Explore Your Dream Destinations" : "Jelajahi Destinasi Impian"}
            </h2>
            <p className="section-subtitle max-w-lg">
              {language === "en"
                ? "From the natural beauty of the Archipelago to the charm of distant lands, find the perfect destination for you."
                : "Dari keindahan alam Nusantara hingga pesona negeri-negeri jauh, temukan destinasi yang sempurna untuk Anda."}
            </p>
          </div>
          <Link
            href="/open-trip"
            className="btn-secondary inline-flex items-center gap-2 text-sm flex-shrink-0"
          >
            {language === "en" ? "All Destinations" : "Semua Destinasi"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Destinations Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-36 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {destinations.map((dest, index) => {
              const displayName = language === "en" && dest.nameEn ? dest.nameEn : dest.name;
              const displayCountry = language === "en" && dest.countryEn ? dest.countryEn : dest.country;
              return (
                <Link
                  key={dest.id}
                  href={`/open-trip`}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                    index === 0 ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""
                  }`}
                  style={{ height: index === 0 ? "320px" : "150px" }}
                >
                  <Image
                    src={dest.image}
                    alt={displayName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple/80 via-purple/20 to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 text-xs font-medium bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full font-inter">
                    {dest.category === "domestik"
                      ? language === "en" ? "Domestic" : "Domestik"
                      : language === "en" ? "International" : "Internasional"}
                  </span>

                  {/* Content */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-ocean" />
                      <span className="text-white/70 text-xs font-inter">{displayCountry}</span>
                    </div>
                    <h3 className={`text-white font-bold font-poppins ${index === 0 ? "text-2xl" : "text-sm"}`}>
                      {displayName}
                    </h3>
                    <p className="text-white/60 text-xs font-inter">
                      {dest.packageCount} {language === "en" ? "packages available" : "paket tersedia"}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
