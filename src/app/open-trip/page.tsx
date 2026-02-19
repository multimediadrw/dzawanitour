"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { openTripDomestik, openTripInternasional } from "@/lib/data";
import { MessageCircle, Users, Calendar, CheckCircle, AlertCircle } from "lucide-react";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function OpenTripContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"domestik" | "internasional">("domestik");

  useEffect(() => {
    const kategori = searchParams.get("kategori");
    if (kategori === "internasional") {
      setActiveTab("internasional");
    } else {
      setActiveTab("domestik");
    }
  }, [searchParams]);

  const data = activeTab === "domestik" ? openTripDomestik : openTripInternasional;

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">

      {/* Info Banner */}
      <div className="bg-ocean-50 border border-ocean/20 rounded-2xl p-5 mb-8 flex items-start gap-3">
        <Users className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-gray-800 font-poppins text-sm">Tentang Open Trip</p>
          <p className="text-gray-600 font-inter text-sm mt-0.5">
            Open Trip adalah paket wisata bersama dengan peserta dari berbagai daerah. Cocok untuk solo traveler atau pasangan yang ingin liburan hemat dengan teman baru. Kuota terbatas per keberangkatan.
          </p>
        </div>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setActiveTab("domestik")}
          className={`px-8 py-3 rounded-full font-semibold font-poppins text-sm transition-all duration-300 ${
            activeTab === "domestik"
              ? "bg-magenta text-white shadow-lg shadow-magenta/30"
              : "bg-white text-magenta border-2 border-magenta/30 hover:border-magenta"
          }`}
        >
          Wisata Domestik
        </button>
        <button
          onClick={() => setActiveTab("internasional")}
          className={`px-8 py-3 rounded-full font-semibold font-poppins text-sm transition-all duration-300 ${
            activeTab === "internasional"
              ? "bg-magenta text-white shadow-lg shadow-magenta/30"
              : "bg-white text-magenta border-2 border-magenta/30 hover:border-magenta"
          }`}
        >
          Wisata Internasional
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-800 font-poppins">
            Open Trip — {activeTab === "domestik" ? "Wisata Domestik" : "Wisata Internasional"}
          </h2>
          <span className="text-sm text-gray-500 font-inter">{data.length} paket tersedia</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Destinasi</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Durasi</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Tanggal Berangkat</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Harga / Pax</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Sisa Kuota</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Includes</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-800 font-poppins text-sm">{item.destinasi}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600 font-inter text-sm">
                      <Calendar className="w-3.5 h-3.5 text-ocean" />
                      {item.durasi}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700 font-inter text-sm">{item.tanggalBerangkat}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-magenta font-poppins text-sm">{formatRupiah(item.harga)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-700 font-inter text-sm">
                        {item.tersisa}/{item.kuota}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {item.status === "Tersedia" ? (
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full font-inter">
                        <CheckCircle className="w-3 h-3" />
                        Tersedia
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 text-xs font-medium px-2.5 py-1 rounded-full font-inter">
                        <AlertCircle className="w-3 h-3" />
                        Hampir Penuh
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-500 font-inter text-xs">{item.includes}</span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`https://wa.me/6281234567890?text=Halo Dzawani Tour, saya ingin booking Open Trip ${item.destinasi} tanggal ${item.tanggalBerangkat}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-magenta hover:bg-magenta/90 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300 font-poppins whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Pesan
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 bg-dzawani-gradient rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold font-poppins mb-2">Tidak menemukan jadwal yang cocok?</h3>
        <p className="text-white/80 font-inter mb-5">
          Hubungi kami untuk informasi jadwal terbaru atau pertimbangkan paket Private Trip yang lebih fleksibel.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-magenta font-semibold py-3 px-6 rounded-xl hover:bg-white/90 transition-all font-poppins inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Hubungi via WhatsApp
          </a>
          <Link
            href="/private-trip"
            className="bg-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/30 transition-all font-poppins"
          >
            Lihat Private Trip
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OpenTripPage() {
  return (
    <main>
      <Navbar />

      {/* Hero D'Tourkeun */}
      <div className="bg-purple pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dzawani-gradient opacity-80" />
        <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full font-poppins mb-4">
            <span>✦</span> Open Trip Bareng — Seru, Hemat, Berkesan!
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-3">
            Hayu Urang Jalan-Jalan!
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
            Gabung sareng saderek-saderek ti sakuliah Indonesia — perjalanan hemat, teman anyar, kenangan abadi.
          </p>
        </div>
      </div>

      <Suspense fallback={
        <div className="container mx-auto px-4 max-w-7xl py-12 text-center">
          <div className="w-8 h-8 border-4 border-magenta border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      }>
        <OpenTripContent />
      </Suspense>

      <Footer />
    </main>
  );
}
