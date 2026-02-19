import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { tourPackages } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import {
  Star,
  Clock,
  MapPin,
  Users,
  Check,
  X,
  Phone,
  MessageCircle,
  Calendar,
  ChevronRight,
} from "lucide-react";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return tourPackages.map((tour) => ({ id: tour.id }));
}

export default function TourDetailPage({ params }: Props) {
  const tour = tourPackages.find((t) => t.id === params.id);

  if (!tour) {
    notFound();
  }

  const relatedTours = tourPackages
    .filter((t) => t.id !== tour.id && t.category === tour.category)
    .slice(0, 3);

  const excludes = [
    "Pengeluaran pribadi",
    "Tips untuk guide",
    "Biaya visa (jika tidak termasuk)",
    "Asuransi perjalanan",
  ];

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple/90 via-purple/40 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-28 left-0 right-0 container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-2 text-white/70 text-sm font-inter">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/paket" className="hover:text-white transition-colors">Paket Tour</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{tour.title}</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4 max-w-7xl">
          {tour.badge && (
            <span className="inline-block bg-magenta text-white text-xs font-bold px-3 py-1.5 rounded-full font-poppins mb-3">
              {tour.badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-3">
            {tour.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-white/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-ocean" />
              {tour.destination}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-ocean" />
              {tour.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {tour.rating} ({tour.reviewCount} ulasan)
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 font-poppins mb-4">
                Tentang Paket Ini
              </h2>
              <p className="text-gray-600 font-inter leading-relaxed">{tour.description}</p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 font-poppins mb-4">
                Highlight Perjalanan
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {tour.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3 p-3 bg-ocean-50 rounded-xl">
                    <div className="w-8 h-8 bg-ocean rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm font-inter">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Includes & Excludes */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 font-poppins mb-4">
                Fasilitas & Ketentuan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-600 font-poppins mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Sudah Termasuk
                  </h3>
                  <ul className="space-y-2">
                    {tour.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600 font-inter">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-500 font-poppins mb-3 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    Tidak Termasuk
                  </h3>
                  <ul className="space-y-2">
                    {excludes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600 font-inter">
                        <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                <div className="mb-4">
                  {tour.originalPrice && (
                    <p className="text-gray-400 text-sm line-through font-inter">
                      {formatCurrency(tour.originalPrice)}
                    </p>
                  )}
                  <p className="text-3xl font-bold text-magenta font-poppins">
                    {formatCurrency(tour.price)}
                  </p>
                  <p className="text-gray-500 text-sm font-inter">/orang</p>
                </div>

                {tour.originalPrice && (
                  <div className="bg-green-50 text-green-700 text-sm px-3 py-2 rounded-lg font-inter mb-4">
                    Hemat {formatCurrency(tour.originalPrice - tour.price)} dari harga normal!
                  </div>
                )}

                {/* Booking Form */}
                <div className="space-y-3 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-inter mb-1.5">
                      Tanggal Keberangkatan
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-inter focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-inter mb-1.5">
                      Jumlah Peserta
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm font-inter focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean bg-white appearance-none">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>{n} Orang</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button className="btn-primary w-full text-base py-4 mb-3">
                  Pesan Sekarang
                </button>
                <a
                  href={`https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20dengan%20paket%20${encodeURIComponent(tour.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 px-6 rounded-full transition-all duration-300 font-poppins text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  Tanya via WhatsApp
                </a>
              </div>

              {/* Contact Card */}
              <div className="bg-purple-50 rounded-2xl p-5">
                <p className="font-semibold text-purple font-poppins mb-3">Butuh Bantuan?</p>
                <p className="text-gray-600 text-sm font-inter mb-4">
                  Tim kami siap membantu Anda 24/7
                </p>
                <a
                  href="tel:+6281234567890"
                  className="flex items-center gap-2 text-purple font-semibold text-sm font-inter hover:text-magenta transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +62 812-3456-7890
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tours */}
        {relatedTours.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-6">
              Paket Tour Terkait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTours.map((relatedTour) => (
                <div key={relatedTour.id} className="card overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedTour.image}
                      alt={relatedTour.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 font-poppins mb-1">{relatedTour.title}</h3>
                    <p className="text-magenta font-bold font-poppins">{formatCurrency(relatedTour.price)}</p>
                    <Link
                      href={`/paket/${relatedTour.id}`}
                      className="mt-3 btn-primary text-sm py-2 block text-center"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
