"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { openTripDomestik, openTripInternasional } from "@/lib/data";
import {
  MessageCircle,
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const MONTH_FULL = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

// Parse "15 Maret 2025" to Date
function parseIndonesianDate(str: string): Date | null {
  const parts = str.trim().split(" ");
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0]);
  const monthMap: Record<string, number> = {
    Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
    Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11,
  };
  const month = monthMap[parts[1]];
  const year = parseInt(parts[2]);
  if (isNaN(day) || month === undefined || isNaN(year)) return null;
  return new Date(year, month, day);
}

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDateLabel(d: Date) {
  return `${d.getDate()} ${MONTH_FULL[d.getMonth()]} ${d.getFullYear()}`;
}

// Generate 90 days starting from earliest trip date or today
function generateDays(startDate: Date, count = 90): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    days.push(d);
  }
  return days;
}

type TripItem = {
  id: string;
  destinasi: string;
  durasi: string;
  tanggalBerangkat: string;
  harga: number;
  kuota: number;
  tersisa: number;
  status: string;
  includes: string;
  slug?: string;
  hasDetail?: boolean;
};

function StatusBadge({ status }: { status: string }) {
  if (status === "Tersedia") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
        <CheckCircle className="w-3.5 h-3.5" />
        Tersedia
      </span>
    );
  }
  if (status === "Hampir Penuh") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
        <AlertCircle className="w-3.5 h-3.5" />
        Hampir Penuh
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
      <XCircle className="w-3.5 h-3.5" />
      Penuh
    </span>
  );
}

function TripCard({ item, language }: { item: TripItem; language: string }) {
  const includes = item.includes.split(",").map((s) => s.trim());
  const isFull = item.status === "Penuh";

  return (
    <div className="border border-gray-100 rounded-2xl p-5 bg-white hover:border-magenta/30 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between gap-4">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <MapPin className="w-4 h-4 text-magenta flex-shrink-0" />
            <h4 className="font-bold text-gray-800 font-poppins text-lg group-hover:text-magenta transition-colors">
              {item.destinasi}
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-3 ml-6">
            <span className="inline-flex items-center gap-1 text-sm text-gray-500 font-inter">
              <Clock className="w-3.5 h-3.5 text-ocean" />
              {item.durasi}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-gray-500 font-inter">
              <Calendar className="w-3.5 h-3.5 text-ocean" />
              {item.tanggalBerangkat}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-gray-500 font-inter">
              <Users className="w-3.5 h-3.5 text-ocean" />
              {item.tersisa}/{item.kuota} kursi
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3 ml-6">
            <StatusBadge status={item.status} />
          </div>

          {/* Includes */}
          <div className="flex flex-wrap gap-1.5 ml-6">
            {includes.map((inc, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full font-inter border border-gray-100"
              >
                <CheckCircle className="w-3 h-3 text-green-500" />
                {inc}
              </span>
            ))}
          </div>

          {/* Detail link */}
          {item.hasDetail && item.slug && (
            <Link
              href={`/open-trip/${item.slug}`}
              className="inline-block mt-3 ml-6 text-sm text-ocean font-semibold font-inter hover:underline"
            >
              {language === "en" ? "View Details →" : "Lihat Detail →"}
            </Link>
          )}
        </div>

        {/* Right: Price + CTA */}
        <div className="flex flex-col items-end gap-3 flex-shrink-0">
          <div className="text-right">
            <p className="text-2xl font-bold text-magenta font-poppins">
              {formatRupiah(item.harga)}
            </p>
            <p className="text-xs text-gray-400 font-inter">/pax</p>
          </div>

          <a
            href={`https://wa.me/628112222254?text=${encodeURIComponent(
              `Halo Dzawani Tour, saya ingin booking Open Trip *${item.destinasi}*.\n\nTanggal Keberangkatan: ${item.tanggalBerangkat}\nHarga: ${formatRupiah(item.harga)}/pax\n\nMohon info lebih lanjut.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold font-poppins text-sm transition-all whitespace-nowrap ${
              isFull
                ? "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
                : "bg-magenta text-white hover:bg-magenta/90 shadow-md shadow-magenta/20 active:scale-95"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            {isFull ? (language === "en" ? "Full" : "Penuh") : (language === "en" ? "Book Now" : "Pilih Tiket")}
          </a>
        </div>
      </div>
    </div>
  );
}

function OpenTripContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"domestik" | "internasional">("domestik");
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const scrollRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const kategori = searchParams.get("kategori");
    if (kategori === "internasional") setActiveTab("internasional");
    else setActiveTab("domestik");
  }, [searchParams]);

  const data: TripItem[] = activeTab === "domestik" ? openTripDomestik : openTripInternasional;

  // Build map: dateKey -> trips
  const tripsByDate: Record<string, TripItem[]> = {};
  data.forEach((item) => {
    const d = parseIndonesianDate(item.tanggalBerangkat);
    if (d) {
      const key = toDateKey(d);
      if (!tripsByDate[key]) tripsByDate[key] = [];
      tripsByDate[key].push(item);
    }
  });

  const availableDates = new Set(Object.keys(tripsByDate));

  // Start from earliest available date or today
  const allDates = Object.keys(tripsByDate).sort();
  const startDate = allDates.length > 0
    ? new Date(allDates[0] + "T00:00:00")
    : new Date();

  const days = generateDays(startDate, 120);

  // Auto-select first available date when tab changes
  useEffect(() => {
    if (allDates.length > 0) {
      setSelectedDateKey(allDates[0]);
    } else {
      setSelectedDateKey(null);
    }
  }, [activeTab]);

  const selectedTrips = selectedDateKey ? (tripsByDate[selectedDateKey] || []) : [];

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -220, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 220, behavior: "smooth" });

  const handleSelectDate = (key: string) => {
    setSelectedDateKey(key);
    setShowCalendar(false);
  };

  // Calendar
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const calDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calDays.push(d);

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      {/* Info Banner */}
      <div className="bg-ocean-50 border border-ocean/20 rounded-2xl p-5 mb-8 flex items-start gap-3">
        <Users className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-gray-800 font-poppins text-sm">
            {language === "en" ? "About Open Trip" : "Tentang Open Trip"}
          </p>
          <p className="text-gray-600 font-inter text-sm mt-0.5">
            {language === "en"
              ? "Open Trip is a group travel package with participants from various regions. Perfect for solo travelers or couples who want an affordable holiday with new friends. Limited quota per departure."
              : "Open Trip adalah paket wisata bersama dengan peserta dari berbagai daerah. Cocok untuk solo traveler atau pasangan yang ingin liburan hemat dengan teman baru. Kuota terbatas per keberangkatan."}
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
          {language === "en" ? "Domestic Tour" : "Wisata Domestik"}
        </button>
        <button
          onClick={() => setActiveTab("internasional")}
          className={`px-8 py-3 rounded-full font-semibold font-poppins text-sm transition-all duration-300 ${
            activeTab === "internasional"
              ? "bg-magenta text-white shadow-lg shadow-magenta/30"
              : "bg-white text-magenta border-2 border-magenta/30 hover:border-magenta"
          }`}
        >
          {language === "en" ? "International Tour" : "Wisata Internasional"}
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-visible mb-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-magenta" />
            <h2 className="font-bold text-gray-800 font-poppins">
              {language === "en" ? "Available Tickets" : "Tiket yang Tersedia"}
            </h2>
            <span className="bg-magenta/10 text-magenta text-xs font-bold px-2 py-0.5 rounded-full font-poppins">
              {data.length} {language === "en" ? "packages" : "paket"}
            </span>
          </div>
          <span className="text-sm text-gray-400 font-inter hidden sm:block">
            {language === "en" ? "Select departure date" : "Pilih tanggal keberangkatan"}
          </span>
        </div>

        {/* Date Picker Strip */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            {/* Calendar toggle */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-semibold font-poppins transition-all ${
                  showCalendar
                    ? "bg-ocean text-white border-ocean"
                    : "bg-white text-ocean border-ocean/30 hover:border-ocean"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden md:inline">
                  {language === "en" ? "Calendar" : "Kalender"}
                </span>
              </button>

              {/* Calendar Popup */}
              {showCalendar && (
                <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-72">
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={() => {
                        if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
                        else setCalMonth(m => m - 1);
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-gray-800 font-poppins text-sm">
                      {MONTH_FULL[calMonth]} {calYear}
                    </span>
                    <button
                      onClick={() => {
                        if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
                        else setCalMonth(m => m + 1);
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-0.5 mb-1">
                    {DAY_NAMES.map(d => (
                      <div key={d} className="text-center text-xs text-gray-400 font-inter py-1">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-0.5">
                    {calDays.map((day, idx) => {
                      if (!day) return <div key={idx} />;
                      const key = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                      const hasTrip = availableDates.has(key);
                      const isSelected = selectedDateKey === key;
                      return (
                        <button
                          key={idx}
                          disabled={!hasTrip}
                          onClick={() => handleSelectDate(key)}
                          className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs transition-all ${
                            isSelected ? "bg-magenta text-white font-bold" :
                            hasTrip ? "bg-magenta/10 text-magenta font-semibold hover:bg-magenta/20 cursor-pointer" :
                            "text-gray-300 cursor-not-allowed"
                          }`}
                        >
                          {day}
                          {hasTrip && !isSelected && (
                            <span className="w-1 h-1 bg-magenta rounded-full mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Scroll left */}
            <button onClick={scrollLeft} className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>

            {/* Date strip */}
            <div
              ref={scrollRef}
              className="flex gap-2 overflow-x-auto flex-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {days.map((day) => {
                const key = toDateKey(day);
                const hasTrip = availableDates.has(key);
                const isSelected = selectedDateKey === key;
                const count = tripsByDate[key]?.length || 0;

                return (
                  <button
                    key={key}
                    onClick={() => hasTrip && handleSelectDate(key)}
                    disabled={!hasTrip}
                    className={`flex flex-col items-center justify-center px-3 py-2.5 rounded-xl border-2 flex-shrink-0 min-w-[64px] transition-all duration-200 ${
                      isSelected
                        ? "bg-ocean border-ocean text-white shadow-lg shadow-ocean/30 scale-105"
                        : hasTrip
                        ? "bg-white border-ocean/30 text-gray-800 hover:border-ocean hover:bg-ocean/5 cursor-pointer"
                        : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    <span className={`text-xs font-inter ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                      {DAY_NAMES[day.getDay()]}
                    </span>
                    <span className={`text-sm font-bold font-poppins ${isSelected ? "text-white" : hasTrip ? "text-gray-800" : "text-gray-300"}`}>
                      {day.getDate()}
                    </span>
                    <span className={`text-xs font-inter ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                      {MONTH_NAMES[day.getMonth()]}
                    </span>
                    {hasTrip && !isSelected && (
                      <span className="w-1.5 h-1.5 bg-magenta rounded-full mt-0.5" />
                    )}
                    {isSelected && count > 0 && (
                      <span className="text-xs text-white/80 font-inter">{count} trip</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Scroll right */}
            <button onClick={scrollRight} className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Trip Cards */}
        <div className="p-6">
          {!selectedDateKey || selectedTrips.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-200" />
              <p className="font-semibold text-gray-500 font-poppins mb-1">
                {language === "en" ? "No trips on this date" : "Tidak ada jadwal pada tanggal ini"}
              </p>
              <p className="text-sm text-gray-400 font-inter">
                {language === "en" ? "Select a date with a pink dot" : "Pilih tanggal yang memiliki titik merah"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Label */}
              <p className="text-sm text-gray-500 font-inter">
                {language === "en" ? "Showing" : "Menampilkan"}{" "}
                <span className="font-semibold text-gray-800">{selectedTrips.length} paket</span>{" "}
                {language === "en" ? "for departure on" : "untuk keberangkatan"}{" "}
                <span className="font-semibold text-magenta">
                  {selectedDateKey
                    ? formatDateLabel(new Date(selectedDateKey + "T00:00:00"))
                    : ""}
                </span>
              </p>

              {selectedTrips.map((item) => (
                <TripCard key={item.id} item={item} language={language} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 bg-dzawani-gradient rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold font-poppins mb-2">
          {language === "en" ? "Can&apos;t find a suitable schedule?" : "Tidak menemukan jadwal yang cocok?"}
        </h3>
        <p className="text-white/80 font-inter mb-5">
          {language === "en"
            ? "Contact us for the latest schedule information or consider our more flexible Private Trip package."
            : "Hubungi kami untuk informasi jadwal terbaru atau pertimbangkan paket Private Trip yang lebih fleksibel."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://wa.me/628112222254"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-magenta font-semibold py-3 px-6 rounded-xl hover:bg-white/90 transition-all font-poppins inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            {language === "en" ? "Contact via WhatsApp" : "Hubungi via WhatsApp"}
          </a>
          <Link
            href="/private-trip"
            className="bg-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/30 transition-all font-poppins"
          >
            {language === "en" ? "View Private Trip" : "Lihat Private Trip"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OpenTripPage() {
  const { language } = useLanguage();
  return (
    <main>
      <Navbar />
      {/* Hero */}
      <div className="bg-purple pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dzawani-gradient opacity-80" />
        <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full font-poppins mb-4">
            <span>✦</span>
            {language === "en" ? "Open Trip Together — Fun, Affordable, Memorable!" : "Open Trip Bareng — Seru, Hemat, Berkesan!"}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-3">
            {language === "en" ? "Let&apos;s Go on an Adventure!" : "Hayu Urang Jalan-Jalan!"}
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
            {language === "en"
              ? "Join travelers from all over Indonesia — affordable trips, new friends, lasting memories. Limited quota, register now!"
              : "Gabung sareng saderek-saderek ti sakuliah Indonesia — perjalanan hemat, teman anyar, kenangan abadi. Kuota terbatas, yuk daftar sekarang!"}
          </p>
        </div>
      </div>
      <Suspense fallback={<div className="py-20 text-center text-gray-400 font-inter">Loading...</div>}>
        <OpenTripContent />
      </Suspense>
      <Footer />
    </main>
  );
}
