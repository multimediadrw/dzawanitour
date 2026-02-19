import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

const footerLinks = {
  trip: [
    { label: "Open Trip Domestik", href: "/open-trip?kategori=domestik" },
    { label: "Open Trip Internasional", href: "/open-trip?kategori=internasional" },
    { label: "Private Trip Domestik", href: "/private-trip?kategori=domestik" },
    { label: "Private Trip Internasional", href: "/private-trip?kategori=internasional" },
  ],
  bantuan: [
    { label: "FAQ", href: "/faq" },
    { label: "Syarat & Ketentuan", href: "/faq?tab=syarat" },
    { label: "Kontak Kami", href: "/kontak" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-purple text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-lg font-poppins">D</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white font-poppins">Dzawani</span>
                <span className="font-bold text-xl text-ocean font-poppins">Tour</span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed font-inter mb-6 max-w-xs">
              Dzawani Tour hadir untuk mewujudkan impian perjalanan Anda. Dengan pengalaman lebih dari 10 tahun, kami siap memberikan layanan terbaik untuk setiap perjalanan Anda.
            </p>
            <p className="text-ocean font-semibold text-sm italic font-poppins mb-6">
              &ldquo;Your Colorful Journey Starts Here&rdquo;
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/dzawanitour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-magenta flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/dzawanitour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-ocean flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@dzawanitour"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Trip Links */}
          <div>
            <h4 className="font-bold text-base mb-5 font-poppins text-ocean">Paket Trip</h4>
            <ul className="space-y-3">
              {footerLinks.trip.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors font-inter"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-bold text-base mt-8 mb-5 font-poppins text-ocean">Bantuan</h4>
            <ul className="space-y-3">
              {footerLinks.bantuan.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors font-inter"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-base mb-5 font-poppins text-ocean">Kontak Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-magenta flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm font-inter">
                  Jl. Raya Wisata No. 123, Jakarta Selatan, DKI Jakarta 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-magenta flex-shrink-0" />
                <a
                  href="tel:+6281234567890"
                  className="text-white/70 hover:text-white text-sm transition-colors font-inter"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-magenta flex-shrink-0" />
                <a
                  href="mailto:info@dzawanitour.com"
                  className="text-white/70 hover:text-white text-sm transition-colors font-inter"
                >
                  info@dzawanitour.com
                </a>
              </li>
            </ul>

            {/* Certifications */}
            <div className="mt-6">
              <p className="text-white/50 text-xs font-inter mb-2">Terdaftar & Berizin:</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded font-inter">ASITA</span>
                <span className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded font-inter">IATA</span>
                <span className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded font-inter">Kemenag</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 max-w-7xl py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/50 text-sm font-inter">
              &copy; {new Date().getFullYear()} Dzawani Tour. Semua hak dilindungi.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/faq" className="text-white/50 hover:text-white text-sm transition-colors font-inter">
                FAQ
              </Link>
              <Link href="/faq?tab=syarat" className="text-white/50 hover:text-white text-sm transition-colors font-inter">
                Syarat & Ketentuan
              </Link>
              <Link href="/kontak" className="text-white/50 hover:text-white text-sm transition-colors font-inter">
                Kontak
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
