"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { privateTripDomestik, privateTripInternasional } from "@/lib/data";
import { MessageCircle, Shield, Clock, CheckCircle } from "lucide-react";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function PrivateTripPage() {
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

  const data = activeTab === "domestik" ? privateTripDomestik : privateTripInternasional;

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <div className="bg-purple pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dzawani-gradient opacity-80" />
        <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-3">
            Private Trip
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
            Perjalanan eksklusif khusus Anda dan rombongan — jadwal fleksibel, itinerary sesuai keinginan
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">

        {/* Keunggulan Private Trip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: Shield,
              title: "Eksklusif & Privat",
              desc: "Hanya Anda dan rombongan. Tidak ada peserta lain yang bergabung.",
              color: "text-magenta",
              bg: "bg-magenta-50",
            },
            {
              icon: Clock,
              title: "Jadwal Fleksibel",
              desc: "Tentukan sendiri tanggal keberangkatan sesuai kenyamanan Anda.",
              color: "text-ocean",
              bg: "bg-ocean-50",
            },
            {
              icon: CheckCircle,
              title: "Itinerary Custom",
              desc: "Rute dan aktivitas dapat disesuaikan dengan preferensi rombongan.",
              color: "text-purple",
              bg: "bg-purple-50",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4">
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 font-poppins text-sm">{item.title}</p>
                  <p className="text-gray-500 font-inter text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
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
              Private Trip — {activeTab === "domestik" ? "Wisata Domestik" : "Wisata Internasional"}
            </h2>
            <span className="text-sm text-gray-500 font-inter">Harga mulai per orang</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Destinasi</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">Min. Pax</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">
                    <span className="text-magenta">Harga 2 Pax</span>
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">
                    <span className="text-ocean">Harga 4 Pax</span>
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">
                    <span className="text-purple">Harga 6 Pax</span>
                  </th>
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
                      <span className="text-gray-600 font-inter text-sm">{item.minPax}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-magenta font-poppins text-sm">{formatRupiah(item.hargaPer2Pax)}</span>
                      <span className="text-gray-400 font-inter text-xs block">/orang</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-ocean font-poppins text-sm">{formatRupiah(item.hargaPer4Pax)}</span>
                      <span className="text-gray-400 font-inter text-xs block">/orang</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-purple font-poppins text-sm">{formatRupiah(item.hargaPer6Pax)}</span>
                      <span className="text-gray-400 font-inter text-xs block">/orang</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-500 font-inter text-xs">{item.includes}</span>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`https://wa.me/6281234567890?text=Halo Dzawani Tour, saya ingin konsultasi Private Trip ke ${item.destinasi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-magenta hover:bg-magenta/90 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300 font-poppins whitespace-nowrap"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Konsultasi
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Note */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 font-inter">
              * Harga di atas merupakan estimasi per orang. Harga final dapat berbeda tergantung tanggal keberangkatan, pilihan hotel, dan kebutuhan khusus. Hubungi kami untuk penawaran terbaik.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 bg-dzawani-gradient rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold font-poppins mb-2">Siap merencanakan perjalanan impian Anda?</h3>
          <p className="text-white/80 font-inter mb-5">
            Konsultasikan kebutuhan perjalanan Anda dengan tim kami. Kami akan merancang itinerary terbaik sesuai budget dan keinginan Anda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/6281234567890?text=Halo Dzawani Tour, saya ingin konsultasi Private Trip"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-magenta font-semibold py-3 px-6 rounded-xl hover:bg-white/90 transition-all font-poppins inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Konsultasi Gratis via WhatsApp
            </a>
            <Link
              href="/open-trip"
              className="bg-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/30 transition-all font-poppins"
            >
              Lihat Open Trip
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
