"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { privateTripDomestik, privateTripInternasional } from "@/lib/data";
import {
  MessageCircle,
  Shield,
  Clock,
  CheckCircle,
  Users,
  MapPin,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

type PrivateTripItem = {
  id: string;
  destinasi: string;
  durasi: string;
  minPax: string;
  hargaPer2Pax: number;
  hargaPer4Pax: number;
  hargaPer6Pax: number;
  status: string;
  includes: string;
};

function PrivateTripCard({ item, pt }: { item: PrivateTripItem; pt: Record<string, string> }) {
  const [expanded, setExpanded] = useState(false);
  const includes = item.includes.split(",").map((s) => s.trim());

  const paxOptions = [
    { label: "2 Pax", price: item.hargaPer2Pax },
    { label: "4 Pax", price: item.hargaPer4Pax },
    { label: "6 Pax", price: item.hargaPer6Pax },
  ];

  return (
    <div className="border border-gray-100 rounded-2xl bg-white hover:border-magenta/30 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Main Row */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-magenta flex-shrink-0" />
              <h4 className="font-bold text-gray-800 font-poppins text-base group-hover:text-magenta transition-colors">
                {item.destinasi}
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-3 ml-6">
              <span className="inline-flex items-center gap-1 text-sm text-gray-500 font-inter">
                <Clock className="w-3.5 h-3.5 text-ocean" />
                {item.durasi}
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-gray-500 font-inter">
                <Users className="w-3.5 h-3.5 text-ocean" />
                Min. {item.minPax}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                <CheckCircle className="w-3.5 h-3.5" />
                {pt.available || "Tersedia"}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-400 font-inter">
                <Clock className="w-3 h-3" />
                {pt.flexibleDate}
              </span>
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

            {/* Toggle detail */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 ml-6 inline-flex items-center gap-1 text-sm text-ocean font-semibold font-inter hover:underline"
            >
              {expanded ? pt.hidePrices : pt.seeAllPrices}
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Right: Starting price + CTA */}
          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-xs text-gray-400 font-inter mb-0.5">{pt.startingFrom || "Mulai dari"}</p>
              <p className="text-2xl font-bold text-magenta font-poppins">
                {formatRupiah(item.hargaPer2Pax)}
              </p>
              <p className="text-xs text-gray-400 font-inter">/2 pax</p>
            </div>

            <a
              href={`https://wa.me/628112222254?text=${encodeURIComponent(
                `Halo Dzawani Tour, saya tertarik dengan paket Private Trip *${item.destinasi}*.\n\nMohon info lebih lanjut mengenai jadwal dan ketersediaan.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold font-poppins text-sm bg-magenta text-white hover:bg-magenta/90 shadow-md shadow-magenta/20 active:scale-95 transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              {pt.book}
            </a>
          </div>
        </div>
      </div>

      {/* Expanded: Price per pax options */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-4">
          <p className="text-xs font-semibold text-gray-500 font-inter uppercase tracking-wider mb-3">
            {pt.pricePerPaxOptions || "Pilihan harga per pax"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {paxOptions.map((opt) => (
              <div
                key={opt.label}
                className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-ocean" />
                  <span className="font-semibold text-gray-700 font-poppins text-sm">{opt.label}</span>
                </div>
                <p className="text-xl font-bold text-magenta font-poppins">
                  {formatRupiah(opt.price)}
                </p>
                <p className="text-xs text-gray-400 font-inter">/pax</p>
                <a
                  href={`https://wa.me/628112222254?text=${encodeURIComponent(
                    `Halo Dzawani Tour, saya ingin booking Private Trip *${item.destinasi}* untuk ${opt.label}.\n\nHarga: ${formatRupiah(opt.price)}/pax\n\nMohon info lebih lanjut.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-magenta/10 text-magenta font-semibold font-poppins text-xs hover:bg-magenta/20 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  {pt.choose || "Pilih"}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PrivateTripContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"domestik" | "internasional">("domestik");
  const { t } = useLanguage();
  const pt = t.privateTrip;

  useEffect(() => {
    const kategori = searchParams.get("kategori");
    if (kategori === "internasional") setActiveTab("internasional");
    else setActiveTab("domestik");
  }, [searchParams]);

  const data: PrivateTripItem[] = activeTab === "domestik" ? privateTripDomestik : privateTripInternasional;

  const features = [
    {
      icon: Shield,
      title: pt.feature1Title,
      desc: pt.feature1Desc,
      color: "text-magenta",
      bg: "bg-pink-50",
    },
    {
      icon: Clock,
      title: pt.feature2Title,
      desc: pt.feature2Desc,
      color: "text-ocean",
      bg: "bg-sky-50",
    },
    {
      icon: Star,
      title: pt.feature3Title,
      desc: pt.feature3Desc,
      color: "text-purple",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {features.map((f, i) => (
          <div key={i} className={`${f.bg} rounded-2xl p-5 flex items-start gap-3`}>
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <f.icon className={`w-5 h-5 ${f.color}`} />
            </div>
            <div>
              <p className={`font-bold font-poppins text-sm ${f.color}`}>{f.title}</p>
              <p className="text-gray-600 font-inter text-xs mt-0.5 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
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
          {pt.domestic}
        </button>
        <button
          onClick={() => setActiveTab("internasional")}
          className={`px-8 py-3 rounded-full font-semibold font-poppins text-sm transition-all duration-300 ${
            activeTab === "internasional"
              ? "bg-magenta text-white shadow-lg shadow-magenta/30"
              : "bg-white text-magenta border-2 border-magenta/30 hover:border-magenta"
          }`}
        >
          {pt.international}
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-magenta" />
            <h2 className="font-bold text-gray-800 font-poppins">
              Private Trip —{" "}
              {activeTab === "domestik" ? pt.domestic : pt.international}
            </h2>
            <span className="bg-magenta/10 text-magenta text-xs font-bold px-2 py-0.5 rounded-full font-poppins">
              {data.length} {pt.packagesAvailable}
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="p-6 space-y-4">
          {data.map((item) => (
            <PrivateTripCard key={item.id} item={item} pt={pt as unknown as Record<string, string>} />
          ))}
        </div>

        {/* Note */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 font-inter">{pt.priceEstimate}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 bg-dzawani-gradient rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold font-poppins mb-2">{pt.readyExclusive}</h3>
        <p className="text-white/80 font-inter mb-5">{pt.readyExclusiveDesc}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://wa.me/628112222254"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-magenta font-semibold py-3 px-6 rounded-xl hover:bg-white/90 transition-all font-poppins inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            {pt.contactWhatsappNow}
          </a>
          <Link
            href="/open-trip"
            className="bg-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/30 transition-all font-poppins"
          >
            {pt.viewOpenTrip}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PrivateTripPage() {
  const { t } = useLanguage();
  const pt = t.privateTrip;
  return (
    <main>
      <Navbar />
      {/* Hero */}
      <div className="bg-purple pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-dzawani-gradient opacity-80" />
        <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full font-poppins mb-4">
            <span>✦</span>
            {pt.heroBadge}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-3">
            {pt.heroTitle}
          </h1>
          <p className="text-white/70 font-inter text-lg max-w-2xl mx-auto">
            {pt.heroSubtitle}
          </p>
        </div>
      </div>
      <Suspense fallback={<div className="py-20 text-center text-gray-400 font-inter">Loading...</div>}>
        <PrivateTripContent />
      </Suspense>
      <Footer />
    </main>
  );
}
