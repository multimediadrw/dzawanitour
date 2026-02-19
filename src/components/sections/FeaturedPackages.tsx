"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TourCard from "@/components/ui/TourCard";
import { tourPackages } from "@/lib/data";

const categories = [
  { id: "semua", label: "Semua Paket" },
  { id: "domestik", label: "Wisata Domestik" },
  { id: "internasional", label: "Wisata Internasional" },
];

export default function FeaturedPackages() {
  const [activeCategory, setActiveCategory] = useState("semua");

  const filteredPackages =
    activeCategory === "semua"
      ? tourPackages
      : tourPackages.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-magenta font-semibold text-sm font-inter uppercase tracking-wider mb-3">
            Paket Pilihan
          </span>
          <h2 className="section-title mb-4">
            Temukan Paket Tour Terbaik
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Dari wisata domestik yang memukau hingga petualangan internasional yang tak terlupakan, tersedia dalam format Open Trip maupun Private Trip.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 font-inter ${
                activeCategory === cat.id
                  ? "bg-magenta text-white shadow-lg shadow-magenta/30"
                  : "bg-white text-gray-600 hover:bg-magenta-50 hover:text-magenta border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tour Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.slice(0, 6).map((tour) => (
            <TourCard key={tour.id} tour={tour} variant="featured" />
          ))}
        </div>

        {/* View All Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/open-trip"
            className="btn-primary inline-flex items-center gap-2 text-base"
          >
            Lihat Open Trip
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/private-trip"
            className="btn-secondary inline-flex items-center gap-2 text-base"
          >
            Lihat Private Trip
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
