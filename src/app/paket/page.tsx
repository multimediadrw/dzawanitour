"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCard from "@/components/ui/TourCard";
import { tourPackages } from "@/lib/data";
import { Search, SlidersHorizontal, X } from "lucide-react";

const categories = [
  { id: "semua", label: "Semua Paket" },
  { id: "domestik", label: "Wisata Domestik" },
  { id: "internasional", label: "Wisata Internasional" },
  { id: "umrah", label: "Paket Umrah" },
];

const sortOptions = [
  { id: "popular", label: "Paling Populer" },
  { id: "price-low", label: "Harga Terendah" },
  { id: "price-high", label: "Harga Tertinggi" },
  { id: "rating", label: "Rating Tertinggi" },
];

function PaketContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori") || "semua";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000000]);

  let filteredPackages = tourPackages.filter((p) => {
    const matchCategory = activeCategory === "semua" || p.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchCategory && matchSearch && matchPrice;
  });

  if (sortBy === "price-low") {
    filteredPackages = [...filteredPackages].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredPackages = [...filteredPackages].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredPackages = [...filteredPackages].sort((a, b) => b.rating - a.rating);
  }

  return (
    <main>
      <Navbar />

      {/* Page Header */}
      <div className="bg-purple pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dzawani-gradient opacity-80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            Paket Tour Pilihan
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
            Temukan paket wisata terbaik sesuai impian dan anggaran Anda
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari destinasi atau paket tour..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean font-inter text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean font-inter text-sm bg-white"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-inter text-sm transition-colors ${
                showFilters
                  ? "bg-magenta text-white border-magenta"
                  : "border-gray-200 text-gray-600 hover:border-magenta hover:text-magenta"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700 font-poppins mb-2">Rentang Harga</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm font-inter focus:outline-none focus:border-ocean"
                      onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm font-inter focus:outline-none focus:border-ocean"
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 50000000])}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
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

        {/* Results Count */}
        <p className="text-gray-500 text-sm font-inter mb-6">
          Menampilkan{" "}
          <span className="font-semibold text-gray-800">{filteredPackages.length}</span>{" "}
          paket tour
        </p>

        {/* Package Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((tour) => (
              <TourCard key={tour.id} tour={tour} variant="featured" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-gray-700 font-poppins mb-2">
              Paket tidak ditemukan
            </h3>
            <p className="text-gray-500 font-inter">
              Coba ubah kata kunci pencarian atau filter yang Anda gunakan
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

export default function PaketPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaketContent />
    </Suspense>
  );
}
