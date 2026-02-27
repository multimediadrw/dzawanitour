"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight, MessageCircle, Users, Clock, CheckCircle, AlertCircle, XCircle, MapPin } from "lucide-react";

interface TripSchedule {
  id: string;
  departureDate: string;
  returnDate?: string | null;
  price?: number | null;
  quota: number;
  bookedCount: number;
  status: string;
  notes?: string | null;
  package?: {
    id: string;
    title: string;
    slug: string;
    destination: string;
    duration?: string;
    includes?: string[];
    category?: string;
    price?: number;
  };
}

interface TripDatePickerSectionProps {
  category?: "domestik" | "internasional";
  language?: string;
  whatsappNumber?: string;
}

const DAY_NAMES_ID = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTH_NAMES_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const MONTH_FULL_ID = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
}

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getStatusConfig(status: string) {
  switch (status) {
    case "available":
      return { label: "Tersedia", color: "text-green-600", bg: "bg-green-50 border-green-200", dot: "bg-green-500", icon: <CheckCircle className="w-3.5 h-3.5" /> };
    case "almost_full":
      return { label: "Hampir Penuh", color: "text-orange-600", bg: "bg-orange-50 border-orange-200", dot: "bg-orange-500", icon: <AlertCircle className="w-3.5 h-3.5" /> };
    case "full":
      return { label: "Penuh", color: "text-red-600", bg: "bg-red-50 border-red-200", dot: "bg-red-500", icon: <XCircle className="w-3.5 h-3.5" /> };
    default:
      return { label: status, color: "text-gray-600", bg: "bg-gray-50 border-gray-200", dot: "bg-gray-400", icon: null };
  }
}

// Generate next 60 days from today
function generateDays(count = 60) {
  const days: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function TripDatePickerSection({
  category = "domestik",
  language = "id",
  whatsappNumber = "628112222254",
}: TripDatePickerSectionProps) {
  const [allSchedules, setAllSchedules] = useState<TripSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

  const scrollRef = useRef<HTMLDivElement>(null);
  const days = generateDays(60);

  // Map of dateKey -> schedules
  const schedulesByDate: Record<string, TripSchedule[]> = {};
  allSchedules.forEach((s) => {
    const key = toDateKey(new Date(s.departureDate));
    if (!schedulesByDate[key]) schedulesByDate[key] = [];
    schedulesByDate[key].push(s);
  });

  // Dates that have schedules
  const availableDates = new Set(Object.keys(schedulesByDate));

  // Find first available date
  const firstAvailableDate = days.find((d) => availableDates.has(toDateKey(d)));

  useEffect(() => {
    fetchAllSchedules();
  }, [category]);

  useEffect(() => {
    if (firstAvailableDate && !selectedDate) {
      setSelectedDate(toDateKey(firstAvailableDate));
    }
  }, [allSchedules]);

  const fetchAllSchedules = async () => {
    setLoading(true);
    try {
      // Fetch all schedules for open-trip packages of this category
      const res = await fetch(`/api/public/schedules/all?category=${category === "domestik" ? "domestic" : "international"}`);
      if (res.ok) {
        const data = await res.json();
        setAllSchedules(data.schedules || []);
      } else {
        setAllSchedules([]);
      }
    } catch {
      setAllSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  const scrollToDate = useCallback((dateKey: string) => {
    const idx = days.findIndex((d) => toDateKey(d) === dateKey);
    if (idx >= 0 && scrollRef.current) {
      const el = scrollRef.current.children[idx] as HTMLElement;
      el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [days]);

  const handleSelectDate = (dateKey: string) => {
    setSelectedDate(dateKey);
    setShowCalendar(false);
  };

  const handleCalendarSelect = (day: number) => {
    const key = `${calendarYear}-${String(calendarMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(key);
    setShowCalendar(false);
    setTimeout(() => scrollToDate(key), 100);
  };

  const selectedSchedules = selectedDate ? (schedulesByDate[selectedDate] || []) : [];

  // Calendar grid
  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-magenta" />
          <h3 className="font-bold text-gray-800 font-poppins">Tiket yang Tersedia</h3>
        </div>
        <div className="animate-pulse">
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-16 h-16 bg-gray-100 rounded-xl flex-shrink-0" />
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (allSchedules.length === 0) {
    return null; // Fallback to existing table if no schedules in DB
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-magenta" />
          <h3 className="font-bold text-gray-800 font-poppins">
            {language === "en" ? "Available Tickets" : "Tiket yang Tersedia"}
          </h3>
          <span className="bg-magenta/10 text-magenta text-xs font-bold px-2 py-0.5 rounded-full font-poppins">
            {allSchedules.length} jadwal
          </span>
        </div>
      </div>

      {/* Date Picker Strip */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2">
          {/* Calendar Button */}
          <div className="relative">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-semibold font-poppins transition-all flex-shrink-0 ${
                showCalendar ? "bg-ocean text-white border-ocean" : "bg-white text-ocean border-ocean/30 hover:border-ocean"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Lihat Kalender</span>
            </button>

            {/* Calendar Dropdown */}
            {showCalendar && (
              <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-72">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => {
                      if (calendarMonth === 0) { setCalendarMonth(11); setCalendarYear(y => y - 1); }
                      else setCalendarMonth(m => m - 1);
                    }}
                    className="p-1.5 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-gray-800 font-poppins text-sm">
                    {MONTH_FULL_ID[calendarMonth]} {calendarYear}
                  </span>
                  <button
                    onClick={() => {
                      if (calendarMonth === 11) { setCalendarMonth(0); setCalendarYear(y => y + 1); }
                      else setCalendarMonth(m => m + 1);
                    }}
                    className="p-1.5 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-0.5 mb-1">
                  {DAY_NAMES_ID.map(d => (
                    <div key={d} className="text-center text-xs text-gray-400 font-inter py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-0.5">
                  {calendarDays.map((day, idx) => {
                    if (!day) return <div key={idx} />;
                    const key = `${calendarYear}-${String(calendarMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const hasSchedule = availableDates.has(key);
                    const isSelected = selectedDate === key;
                    const isPast = new Date(calendarYear, calendarMonth, day) < new Date(new Date().setHours(0,0,0,0));
                    return (
                      <button
                        key={idx}
                        disabled={!hasSchedule || isPast}
                        onClick={() => handleCalendarSelect(day)}
                        className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs transition-all ${
                          isSelected ? "bg-magenta text-white font-bold" :
                          hasSchedule && !isPast ? "bg-magenta/10 text-magenta font-semibold hover:bg-magenta/20" :
                          isPast ? "text-gray-300 cursor-not-allowed" :
                          "text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {day}
                        {hasSchedule && !isPast && !isSelected && (
                          <span className="w-1 h-1 bg-magenta rounded-full mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Scroll Left */}
          <button onClick={scrollLeft} className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>

          {/* Date Strip */}
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide flex-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {days.map((day) => {
              const key = toDateKey(day);
              const hasSchedule = availableDates.has(key);
              const isSelected = selectedDate === key;
              const isToday = key === toDateKey(new Date());
              const schedCount = schedulesByDate[key]?.length || 0;

              return (
                <button
                  key={key}
                  onClick={() => hasSchedule && handleSelectDate(key)}
                  disabled={!hasSchedule}
                  className={`flex flex-col items-center justify-center px-3 py-2.5 rounded-xl border-2 flex-shrink-0 min-w-[64px] transition-all ${
                    isSelected
                      ? "bg-ocean border-ocean text-white shadow-lg shadow-ocean/30"
                      : hasSchedule
                      ? "bg-white border-ocean/30 text-gray-800 hover:border-ocean hover:bg-ocean/5 cursor-pointer"
                      : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <span className={`text-xs font-inter ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                    {DAY_NAMES_ID[day.getDay()]}
                  </span>
                  <span className={`text-sm font-bold font-poppins ${isSelected ? "text-white" : hasSchedule ? "text-gray-800" : "text-gray-300"}`}>
                    {day.getDate()}
                  </span>
                  <span className={`text-xs font-inter ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                    {MONTH_NAMES_ID[day.getMonth()]}
                  </span>
                  {hasSchedule && !isSelected && (
                    <span className="w-1.5 h-1.5 bg-magenta rounded-full mt-0.5" />
                  )}
                  {isSelected && schedCount > 0 && (
                    <span className="text-xs text-white/80 font-inter">{schedCount} trip</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Scroll Right */}
          <button onClick={scrollRight} className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Schedule Cards */}
      <div className="p-6">
        {!selectedDate ? (
          <div className="text-center py-10 text-gray-400">
            <Calendar className="w-10 h-10 mx-auto mb-2 text-gray-200" />
            <p className="font-inter text-sm">Pilih tanggal untuk melihat jadwal yang tersedia</p>
          </div>
        ) : selectedSchedules.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <Calendar className="w-10 h-10 mx-auto mb-2 text-gray-200" />
            <p className="font-inter text-sm font-semibold text-gray-600 mb-1">
              Tidak ada jadwal pada tanggal ini
            </p>
            <p className="font-inter text-xs text-gray-400">Pilih tanggal lain yang memiliki titik merah</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Selected date label */}
            <p className="text-sm text-gray-500 font-inter">
              Menampilkan <span className="font-semibold text-gray-800">{selectedSchedules.length} paket</span> untuk keberangkatan{" "}
              <span className="font-semibold text-magenta">
                {DAY_NAMES_ID[new Date(selectedDate + "T00:00:00").getDay()]},{" "}
                {new Date(selectedDate + "T00:00:00").getDate()}{" "}
                {MONTH_FULL_ID[new Date(selectedDate + "T00:00:00").getMonth()]}{" "}
                {new Date(selectedDate + "T00:00:00").getFullYear()}
              </span>
            </p>

            {selectedSchedules.map((schedule) => {
              const statusCfg = getStatusConfig(schedule.status);
              const price = schedule.price || schedule.package?.price || 0;
              const remaining = schedule.quota - schedule.bookedCount;
              const pkg = schedule.package;

              return (
                <div
                  key={schedule.id}
                  className="border border-gray-100 rounded-2xl p-5 hover:border-magenta/30 hover:shadow-md transition-all bg-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Package Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-magenta flex-shrink-0" />
                        <h4 className="font-bold text-gray-800 font-poppins text-base truncate">
                          {pkg?.title || pkg?.destination || "Paket Open Trip"}
                        </h4>
                      </div>

                      {pkg?.destination && (
                        <p className="text-sm text-gray-500 font-inter mb-2 ml-6">
                          {pkg.destination}
                          {pkg.duration && <span className="ml-2 text-gray-400">• {pkg.duration}</span>}
                        </p>
                      )}

                      {schedule.notes && (
                        <p className="text-sm text-gray-600 font-inter mb-3 ml-6 leading-relaxed">
                          {schedule.notes}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2 ml-6">
                        {/* Status badge */}
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusCfg.bg} ${statusCfg.color}`}>
                          {statusCfg.icon}
                          {statusCfg.label}
                        </span>

                        {/* Quota */}
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 font-inter">
                          <Users className="w-3.5 h-3.5" />
                          {remaining}/{schedule.quota} kursi tersisa
                        </span>

                        {/* Duration */}
                        {pkg?.duration && (
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500 font-inter">
                            <Clock className="w-3.5 h-3.5" />
                            {pkg.duration}
                          </span>
                        )}
                      </div>

                      {/* Includes */}
                      {pkg?.includes && pkg.includes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 ml-6">
                          {pkg.includes.map((inc, i) => (
                            <span key={i} className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full font-inter border border-gray-100">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {inc}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Detail link */}
                      {pkg?.slug && (
                        <Link
                          href={`/open-trip/${pkg.slug}`}
                          className="inline-block mt-3 ml-6 text-sm text-ocean font-semibold font-inter hover:underline"
                        >
                          Lihat Detail →
                        </Link>
                      )}
                    </div>

                    {/* Right: Price + CTA */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-magenta font-poppins">
                          {price > 0 ? formatRupiah(price) : "Hubungi Kami"}
                        </p>
                        {price > 0 && (
                          <p className="text-xs text-gray-400 font-inter">/pax</p>
                        )}
                      </div>

                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                          `Halo Dzawani Tour, saya ingin booking paket *${pkg?.title || pkg?.destination || "Open Trip"}*.\n\nTanggal Keberangkatan: ${new Date(selectedDate + "T00:00:00").getDate()} ${MONTH_FULL_ID[new Date(selectedDate + "T00:00:00").getMonth()]} ${new Date(selectedDate + "T00:00:00").getFullYear()}\n${price > 0 ? `Harga: ${formatRupiah(price)}/pax\n` : ""}Mohon info lebih lanjut.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold font-poppins text-sm transition-all ${
                          schedule.status === "full"
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
                            : "bg-magenta text-white hover:bg-magenta/90 shadow-md shadow-magenta/20 hover:shadow-magenta/30 active:scale-95"
                        }`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        {schedule.status === "full" ? "Penuh" : "Pilih Tiket"}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
