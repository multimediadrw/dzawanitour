import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { destinations } from "@/lib/data";
import { MapPin, Package } from "lucide-react";

export default function DestinasiPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <div className="bg-purple pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dzawani-gradient opacity-80" />
        <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            Destinasi Wisata
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
            Jelajahi keindahan dunia bersama Dzawani Tour
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {["Semua", "Domestik", "Internasional", "Umrah"].map((cat) => (
            <button
              key={cat}
              className="px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 font-inter bg-white text-gray-600 hover:bg-magenta hover:text-white border border-gray-200"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinasi/${dest.id}`}
              className="card group overflow-hidden"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple/80 via-purple/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full font-inter">
                  {dest.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 mb-1">
                  <MapPin className="w-4 h-4 text-ocean" />
                  <span className="text-ocean text-sm font-medium font-inter">{dest.country}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 font-poppins mb-2">{dest.name}</h3>
                <div className="flex items-center gap-2 text-gray-500">
                  <Package className="w-4 h-4" />
                  <span className="text-sm font-inter">{dest.packageCount} paket tersedia</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
