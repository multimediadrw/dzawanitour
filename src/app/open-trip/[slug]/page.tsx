"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getOpenTripBySlug } from "@/lib/open-trip-detail-data";
import TripScheduleCalendar from "@/components/trip/TripScheduleCalendar";
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageCircle,
  ArrowLeft,
  Clock,
  Utensils,
  Hotel,
} from "lucide-react";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function OpenTripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState<"itinerary" | "includes" | "terms" | "booking">(
    "itinerary"
  );

  const trip = getOpenTripBySlug(slug);

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800 font-poppins mb-4">
            Paket Tidak Ditemukan
          </h1>
          <Link href="/open-trip" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Open Trip
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-ocean to-purple overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center max-w-7xl">
          <Link
            href="/open-trip?kategori=internasional"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 text-sm font-inter"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Open Trip
          </Link>

          {trip.badge && (
            <span className="inline-block bg-magenta text-white text-xs font-bold px-3 py-1.5 rounded-full font-poppins mb-3 w-fit">
              {trip.badge}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            {trip.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="font-inter">{trip.destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-inter">{trip.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-inter">Min. {trip.booking.min_participants} orang</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-white/70 text-xs font-inter">Mulai dari</p>
              <p className="text-white font-bold text-2xl font-poppins">
                {formatRupiah(trip.price.low_season.full)}
              </p>
              <p className="text-white/70 text-xs font-inter">per orang</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2">
            {/* Highlights */}
            <div className="card mb-6">
              <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-4">
                Highlights Perjalanan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trip.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-ocean flex-shrink-0" />
                    <span className="text-gray-700 font-inter text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="card">
              <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-4 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("itinerary")}
                    className={`pb-3 px-2 font-semibold text-sm font-poppins whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === "itinerary"
                        ? "border-ocean text-ocean"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Itinerary
                  </button>
                  <button
                    onClick={() => setActiveTab("includes")}
                    className={`pb-3 px-2 font-semibold text-sm font-poppins whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === "includes"
                        ? "border-ocean text-ocean"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Include / Exclude
                  </button>
                  <button
                    onClick={() => setActiveTab("terms")}
                    className={`pb-3 px-2 font-semibold text-sm font-poppins whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === "terms"
                        ? "border-ocean text-ocean"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Syarat & Ketentuan
                  </button>
                  <button
                    onClick={() => setActiveTab("booking")}
                    className={`pb-3 px-2 font-semibold text-sm font-poppins whitespace-nowrap transition-colors border-b-2 ${
                      activeTab === "booking"
                        ? "border-ocean text-ocean"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Info Booking
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "itinerary" && (
                <div className="space-y-6">
                  {trip.itinerary.map((day) => (
                    <div key={day.day} className="border-l-4 border-ocean pl-6 relative">
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-ocean rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {day.day}
                      </div>
                      <h3 className="font-bold text-gray-800 font-poppins mb-2">
                        Day {day.day}: {day.title}
                      </h3>
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Utensils className="w-4 h-4 text-magenta" />
                          <span className="font-inter">{day.meals}</span>
                        </div>
                        {day.hotel && (
                          <div className="flex items-center gap-1">
                            <Hotel className="w-4 h-4 text-purple" />
                            <span className="font-inter text-xs">{day.hotel}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 font-inter text-sm mb-3 leading-relaxed">
                        {day.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {day.activities.map((activity, idx) => (
                          <span
                            key={idx}
                            className="bg-ocean-50 text-ocean-700 text-xs px-2.5 py-1 rounded-full font-inter"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "includes" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-gray-800 font-poppins mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Paket Termasuk
                    </h3>
                    <ul className="space-y-2">
                      {trip.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 font-inter">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 font-poppins mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      Paket Tidak Termasuk
                    </h3>
                    <ul className="space-y-2">
                      {trip.excluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 font-inter">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "terms" && (
                <div className="space-y-6">
                  {trip.terms.map((term, index) => (
                    <div key={index}>
                      <h3 className="font-bold text-gray-800 font-poppins mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        {term.title}
                      </h3>
                      <p className="text-gray-600 font-inter text-sm leading-relaxed pl-7">
                        {term.content}
                      </p>
                    </div>
                  ))}

                  {trip.additional_info.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="font-bold text-gray-800 font-poppins mb-4">
                        Informasi Tambahan
                      </h3>
                      <div className="space-y-3">
                        {trip.additional_info.map((info, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 font-poppins text-sm mb-1">
                              {info.title}
                            </h4>
                            <p className="text-gray-600 font-inter text-sm">{info.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "booking" && (
                <div className="space-y-6">
                  <div className="bg-ocean-50 border border-ocean/20 rounded-xl p-6">
                    <h3 className="font-bold text-gray-800 font-poppins mb-4">
                      Informasi Harga & Pembayaran
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-gray-600 text-xs font-inter mb-1">Low Season</p>
                        <p className="text-ocean font-bold text-2xl font-poppins">
                          {formatRupiah(trip.price.low_season.full)}
                        </p>
                        <p className="text-gray-500 text-xs font-inter mt-2">
                          DP: {formatRupiah(trip.price.low_season.dp)}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-gray-600 text-xs font-inter mb-1">High Season</p>
                        <p className="text-magenta font-bold text-2xl font-poppins">
                          {formatRupiah(trip.price.high_season.full)}
                        </p>
                        <p className="text-gray-500 text-xs font-inter mt-2">
                          DP: {formatRupiah(trip.price.high_season.dp)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700 font-inter">
                        <span className="font-semibold">Minimal Peserta:</span>{" "}
                        {trip.booking.min_participants} orang
                      </p>
                      <p className="text-gray-700 font-inter">
                        <span className="font-semibold">Batas Pelunasan:</span>{" "}
                        {trip.booking.payment_deadline}
                      </p>
                    </div>
                  </div>

                  {trip.notes.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                      <h3 className="font-bold text-gray-800 font-poppins mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        Catatan Penting
                      </h3>
                      <ul className="space-y-2">
                        {trip.notes.map((note, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-yellow-600 flex-shrink-0">•</span>
                            <span className="text-gray-700 font-inter">{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="space-y-4 sticky top-24">
              {/* Price Card */}
              <div className="card">
                <div className="bg-gradient-to-br from-ocean to-purple rounded-xl p-5 mb-4 text-white">
                  <p className="text-white/80 text-xs font-inter mb-1">Harga Mulai Dari</p>
                  <p className="text-3xl font-bold font-poppins">
                    {formatRupiah(trip.price.low_season.full)}
                  </p>
                  <p className="text-white/80 text-sm font-inter mt-1">per orang</p>
                </div>
                <div className="space-y-2.5 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-inter">Durasi</span>
                    <span className="font-semibold text-gray-800 font-poppins">{trip.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-inter">Minimal Peserta</span>
                    <span className="font-semibold text-gray-800 font-poppins">
                      {trip.booking.min_participants} orang
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-inter">Kategori</span>
                    <span className="font-semibold text-gray-800 font-poppins">
                      {trip.category === "international" ? "Internasional" : "Domestik"}
                    </span>
                  </div>
                </div>
                <a
                  href={`https://wa.me/628112222254?text=Halo Dzawani Tour, saya ingin tanya paket ${trip.title}. Mohon info lebih lanjut.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full flex items-center justify-center gap-2 mb-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Konsultasi via WhatsApp
                </a>
                <Link
                  href="/open-trip"
                  className="text-center block text-sm text-gray-500 hover:text-magenta font-inter transition-colors"
                >
                  Lihat Paket Lainnya
                </Link>
              </div>

              {/* Schedule Calendar */}
              <TripScheduleCalendar
                packageSlug={trip.slug}
                packageTitle={trip.title}
                basePrice={trip.price.low_season.full}
                whatsappNumber="628112222254"
                language="id"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
