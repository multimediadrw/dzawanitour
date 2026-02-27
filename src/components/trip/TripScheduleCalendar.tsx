"use client";

import { useState, useEffect, useMemo } from "react";
import { Calendar, ChevronLeft, ChevronRight, Users, CheckCircle, AlertCircle, XCircle, MessageCircle } from "lucide-react";

interface TripSchedule {
  id: string;
  departureDate: string;
  returnDate?: string | null;
  price?: number | null;
  quota: number;
  bookedCount: number;
  status: string;
  notes?: string | null;
  notesEn?: string | null;
}

interface TripScheduleCalendarProps {
  packageSlug: string;
  packageTitle: string;
  basePrice: number;
  whatsappNumber?: string;
  language?: string;
}

const MONTH_NAMES_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];
const MONTH_NAMES_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAY_NAMES_ID = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const DAY_NAMES_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDateID(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTH_NAMES_ID[d.getMonth()]} ${d.getFullYear()}`;
}

function getStatusConfig(status: string, lang: string) {
  switch (status) {
    case "available":
      return {
        label: lang === "en" ? "Available" : "Tersedia",
        color: "text-green-600",
        bg: "bg-green-50 border-green-200",
        dot: "bg-green-500",
        icon: <CheckCircle className="w-4 h-4 text-green-600" />,
      };
    case "almost_full":
      return {
        label: lang === "en" ? "Almost Full" : "Hampir Penuh",
        color: "text-orange-600",
        bg: "bg-orange-50 border-orange-200",
        dot: "bg-orange-500",
        icon: <AlertCircle className="w-4 h-4 text-orange-600" />,
      };
    case "full":
      return {
        label: lang === "en" ? "Full" : "Penuh",
        color: "text-red-600",
        bg: "bg-red-50 border-red-200",
        dot: "bg-red-500",
        icon: <XCircle className="w-4 h-4 text-red-600" />,
      };
    default:
      return {
        label: status,
        color: "text-gray-600",
        bg: "bg-gray-50 border-gray-200",
        dot: "bg-gray-400",
        icon: null,
      };
  }
}

export default function TripScheduleCalendar({
  packageSlug,
  packageTitle,
  basePrice,
  whatsappNumber = "628112222254",
  language = "id",
}: TripScheduleCalendarProps) {
  const [schedules, setSchedules] = useState<TripSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState<TripSchedule | null>(null);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const lang = language;
  const monthNames = lang === "en" ? MONTH_NAMES_EN : MONTH_NAMES_ID;
  const dayNames = lang === "en" ? DAY_NAMES_EN : DAY_NAMES_ID;

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const res = await fetch(`/api/public/schedules?slug=${packageSlug}`);
        const data = await res.json();
        setSchedules(data.schedules || []);
        // Auto-select first available schedule
        const first = (data.schedules || []).find((s: TripSchedule) => s.status !== "full");
        if (first) setSelectedSchedule(first);
      } catch {
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSchedules();
  }, [packageSlug]);

  // Map schedules by date string YYYY-MM-DD
  const scheduleMap = useMemo(() => {
    const map: Record<string, TripSchedule[]> = {};
    schedules.forEach((s) => {
      const key = new Date(s.departureDate).toISOString().split("T")[0];
      if (!map[key]) map[key] = [];
      map[key].push(s);
    });
    return map;
  }, [schedules]);

  // Calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [currentMonth, currentYear]);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const getDaySchedules = (day: number) => {
    const key = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return scheduleMap[key] || [];
  };

  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  const isPast = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    return d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const handleBooking = (schedule: TripSchedule) => {
    const dateStr = formatDateID(schedule.departureDate);
    const price = schedule.price || basePrice;
    const text = encodeURIComponent(
      `Halo Dzawani Tour, saya ingin booking paket *${packageTitle}*.\n\nTanggal Keberangkatan: ${dateStr}\nHarga: ${formatRupiah(price)}/pax\n\nMohon info lebih lanjut.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-magenta" />
          <h3 className="font-bold text-gray-800 font-poppins">
            {lang === "en" ? "Departure Schedule" : "Jadwal Keberangkatan"}
          </h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-8 bg-gray-100 rounded-lg w-1/2" />
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-magenta" />
          <h3 className="font-bold text-gray-800 font-poppins">
            {lang === "en" ? "Departure Schedule" : "Jadwal Keberangkatan"}
          </h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-inter text-sm">
            {lang === "en"
              ? "No schedules available. Please contact us for custom dates."
              : "Belum ada jadwal tersedia. Hubungi kami untuk tanggal custom."}
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Halo Dzawani Tour, saya ingin tanya jadwal keberangkatan untuk paket ${packageTitle}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-magenta text-white px-5 py-2.5 rounded-full text-sm font-semibold font-poppins hover:bg-magenta/90 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {lang === "en" ? "Ask via WhatsApp" : "Tanya via WhatsApp"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-magenta" />
          <h3 className="font-bold text-gray-800 font-poppins">
            {lang === "en" ? "Departure Schedule" : "Jadwal Keberangkatan"}
          </h3>
          <span className="bg-magenta/10 text-magenta text-xs font-bold px-2 py-0.5 rounded-full font-poppins">
            {schedules.length} {lang === "en" ? "dates" : "jadwal"}
          </span>
        </div>
        {/* View toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold font-poppins transition-all ${
              viewMode === "calendar" ? "bg-white text-magenta shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {lang === "en" ? "Calendar" : "Kalender"}
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold font-poppins transition-all ${
              viewMode === "list" ? "bg-white text-magenta shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {lang === "en" ? "List" : "Daftar"}
          </button>
        </div>
      </div>

      <div className="p-6">
        {viewMode === "calendar" ? (
          <div className="space-y-4">
            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h4 className="font-bold text-gray-800 font-poppins text-lg">
                {monthNames[currentMonth]} {currentYear}
              </h4>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {dayNames.map((d) => (
                <div key={d} className="text-center text-xs font-semibold text-gray-400 font-inter py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, idx) => {
                if (!day) return <div key={idx} />;
                const daySchedules = getDaySchedules(day);
                const hasSchedule = daySchedules.length > 0;
                const past = isPast(day);
                const todayDay = isToday(day);
                const firstSched = daySchedules[0];
                const statusCfg = firstSched ? getStatusConfig(firstSched.status, lang) : null;

                return (
                  <button
                    key={idx}
                    disabled={!hasSchedule || past}
                    onClick={() => hasSchedule && !past && setSelectedSchedule(firstSched)}
                    className={`
                      relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-inter transition-all
                      ${todayDay ? "ring-2 ring-ocean ring-offset-1" : ""}
                      ${past ? "opacity-30 cursor-not-allowed" : ""}
                      ${hasSchedule && !past
                        ? selectedSchedule?.id === firstSched?.id
                          ? "bg-magenta text-white shadow-lg shadow-magenta/30 scale-105"
                          : "bg-gray-50 hover:bg-magenta/10 hover:scale-105 cursor-pointer border border-gray-200"
                        : "text-gray-400"
                      }
                    `}
                  >
                    <span className={`font-semibold text-sm ${hasSchedule && !past && selectedSchedule?.id !== firstSched?.id ? "text-gray-800" : ""}`}>
                      {day}
                    </span>
                    {hasSchedule && !past && statusCfg && (
                      <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                        selectedSchedule?.id === firstSched?.id ? "bg-white" : statusCfg.dot
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
              {[
                { dot: "bg-green-500", label: lang === "en" ? "Available" : "Tersedia" },
                { dot: "bg-orange-500", label: lang === "en" ? "Almost Full" : "Hampir Penuh" },
                { dot: "bg-red-500", label: lang === "en" ? "Full" : "Penuh" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-xs text-gray-500 font-inter">
                  <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // List view
          <div className="space-y-3">
            {schedules.map((schedule) => {
              const statusCfg = getStatusConfig(schedule.status, lang);
              const isSelected = selectedSchedule?.id === schedule.id;
              const price = schedule.price || basePrice;
              const remaining = schedule.quota - schedule.bookedCount;

              return (
                <button
                  key={schedule.id}
                  disabled={schedule.status === "full"}
                  onClick={() => schedule.status !== "full" && setSelectedSchedule(schedule)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-magenta bg-magenta/5"
                      : schedule.status === "full"
                      ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                      : "border-gray-100 hover:border-magenta/40 hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800 font-poppins text-sm">
                        {formatDateID(schedule.departureDate)}
                        {schedule.returnDate && (
                          <span className="text-gray-400 font-normal"> — {formatDateID(schedule.returnDate)}</span>
                        )}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${statusCfg.bg} ${statusCfg.color}`}>
                          {statusCfg.icon}
                          {statusCfg.label}
                        </div>
                        <span className="text-xs text-gray-500 font-inter flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {remaining}/{schedule.quota} {lang === "en" ? "seats left" : "sisa kursi"}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-magenta font-poppins text-base">
                        {formatRupiah(price)}
                      </p>
                      <p className="text-xs text-gray-400 font-inter">/pax</p>
                    </div>
                  </div>
                  {schedule.notes && (
                    <p className="text-xs text-gray-500 font-inter mt-2 border-t border-gray-100 pt-2">
                      {schedule.notes}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Selected Schedule Detail Card */}
        {selectedSchedule && (
          <div className="mt-4 p-4 bg-gradient-to-br from-magenta/5 to-purple/5 rounded-xl border border-magenta/20">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-gray-500 font-inter mb-0.5">
                  {lang === "en" ? "Selected Departure" : "Keberangkatan Dipilih"}
                </p>
                <p className="font-bold text-gray-800 font-poppins">
                  {formatDateID(selectedSchedule.departureDate)}
                </p>
                {selectedSchedule.returnDate && (
                  <p className="text-xs text-gray-500 font-inter">
                    {lang === "en" ? "Return:" : "Kembali:"} {formatDateID(selectedSchedule.returnDate)}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-bold text-magenta font-poppins text-xl">
                  {formatRupiah(selectedSchedule.price || basePrice)}
                </p>
                <p className="text-xs text-gray-400 font-inter">/pax</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3 text-sm">
              {(() => {
                const cfg = getStatusConfig(selectedSchedule.status, lang);
                const remaining = selectedSchedule.quota - selectedSchedule.bookedCount;
                return (
                  <>
                    <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.color}`}>
                      {cfg.icon}
                      {cfg.label}
                    </div>
                    <span className="text-gray-600 font-inter flex items-center gap-1 text-xs">
                      <Users className="w-3.5 h-3.5" />
                      {remaining} {lang === "en" ? "seats remaining" : "kursi tersisa"} ({selectedSchedule.bookedCount}/{selectedSchedule.quota})
                    </span>
                  </>
                );
              })()}
            </div>
            {selectedSchedule.notes && (
              <p className="text-xs text-gray-600 font-inter mb-3 bg-white/60 rounded-lg p-2">
                {selectedSchedule.notes}
              </p>
            )}
            <button
              onClick={() => handleBooking(selectedSchedule)}
              disabled={selectedSchedule.status === "full"}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold font-poppins text-sm transition-all ${
                selectedSchedule.status === "full"
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-magenta text-white hover:bg-magenta/90 shadow-lg shadow-magenta/30 hover:shadow-magenta/40 active:scale-95"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              {selectedSchedule.status === "full"
                ? (lang === "en" ? "Quota Full" : "Kuota Penuh")
                : (lang === "en" ? "Book This Schedule" : "Pesan Jadwal Ini")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
