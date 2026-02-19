import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin, Heart, ArrowRight } from "lucide-react";
import { TourPackage } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface TourCardProps {
  tour: TourPackage;
  variant?: "default" | "compact" | "featured";
}

export default function TourCard({ tour, variant = "default" }: TourCardProps) {
  const badgeColors: Record<string, string> = {
    "Best Seller": "bg-magenta text-white",
    "Hot Deal": "bg-sunset text-white",
    "Premium": "bg-purple text-white",
    "Most Popular": "bg-ocean text-white",
    "Seasonal Special": "bg-mint text-white",
    "Terpercaya": "bg-green-600 text-white",
  };

  if (variant === "featured") {
    return (
      <div className="card group relative overflow-hidden">
        <div className="relative h-72 overflow-hidden">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple/90 via-purple/30 to-transparent" />

          {tour.badge && (
            <span
              className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full font-poppins ${
                badgeColors[tour.badge] || "bg-magenta text-white"
              }`}
            >
              {tour.badge}
            </span>
          )}

          <button className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-magenta transition-colors">
            <Heart className="w-4 h-4 text-white" />
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-1 mb-1">
              <MapPin className="w-3.5 h-3.5 text-ocean" />
              <span className="text-white/80 text-xs font-inter">{tour.destination}</span>
            </div>
            <h3 className="text-white font-bold text-xl font-poppins">{tour.title}</h3>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-sm text-gray-700 font-inter">{tour.rating}</span>
              <span className="text-gray-400 text-sm font-inter">({tour.reviewCount} ulasan)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-inter">{tour.duration}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {tour.highlights.slice(0, 3).map((h) => (
              <span key={h} className="text-xs bg-ocean-50 text-ocean-700 px-2 py-1 rounded-full font-inter">
                {h}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              {tour.originalPrice && (
                <p className="text-gray-400 text-xs line-through font-inter">
                  {formatCurrency(tour.originalPrice)}
                </p>
              )}
              <p className="text-magenta font-bold text-xl font-poppins">
                {formatCurrency(tour.price)}
              </p>
              <p className="text-gray-400 text-xs font-inter">/orang</p>
            </div>
            <a
              href={`https://wa.me/6281234567890?text=Halo Dzawani Tour, saya tertarik dengan paket ${tour.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2.5 px-5 inline-flex items-center gap-1.5"
            >
              Pesan
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card group flex flex-col md:flex-row overflow-hidden">
      <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {tour.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full font-poppins ${
              badgeColors[tour.badge] || "bg-magenta text-white"
            }`}
          >
            {tour.badge}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-3.5 h-3.5 text-ocean" />
            <span className="text-ocean text-sm font-medium font-inter">{tour.destination}</span>
          </div>
          <h3 className="text-gray-800 font-bold text-lg font-poppins mb-2">{tour.title}</h3>
          <p className="text-gray-500 text-sm font-inter line-clamp-2 mb-3">{tour.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {tour.includes.slice(0, 3).map((inc) => (
              <span key={inc} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-inter">
                ✓ {inc}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-sm font-inter">{tour.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-inter">{tour.duration}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-magenta font-bold text-lg font-poppins">
              {formatCurrency(tour.price)}
            </p>
            <p className="text-gray-400 text-xs font-inter">/orang</p>
          </div>
        </div>
      </div>
    </div>
  );
}
