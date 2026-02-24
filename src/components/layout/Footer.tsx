"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();

  const footerLinks = {
    trip: [
      { label: language === "en" ? "Domestic Open Trip" : "Open Trip Domestik", href: "/open-trip?kategori=domestik" },
      { label: language === "en" ? "International Open Trip" : "Open Trip Internasional", href: "/open-trip?kategori=internasional" },
      { label: language === "en" ? "Domestic Private Trip" : "Private Trip Domestik", href: "/private-trip?kategori=domestik" },
      { label: language === "en" ? "International Private Trip" : "Private Trip Internasional", href: "/private-trip?kategori=internasional" },
    ],
    bantuan: [
      { label: "FAQ", href: "/faq" },
      { label: language === "en" ? "Terms & Conditions" : "Syarat & Ketentuan", href: "/faq?tab=syarat" },
      { label: language === "en" ? "Contact Us" : "Kontak Kami", href: "/kontak" },
    ],
  };

  return (
    <footer className="bg-purple text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-5">
              <Image
                src="/logo.png"
                alt="Dzawani Tour"
                width={200}
                height={75}
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed font-inter mb-6 max-w-xs">
              {t.footer.tagline}
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
                href="https://wa.me/628112222254"
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
            <h4 className="font-bold text-base mb-5 font-poppins text-ocean">
              {language === "en" ? "Trip Packages" : "Paket Trip"}
            </h4>
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

            <h4 className="font-bold text-base mt-8 mb-5 font-poppins text-ocean">
              {language === "en" ? "Help" : "Bantuan"}
            </h4>
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
            <h4 className="font-bold text-base mb-5 font-poppins text-ocean">{t.footer.contactInfo}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-magenta flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm font-inter">
                  {t.contact.addressValue}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-magenta flex-shrink-0" />
                <a
                  href="tel:+628112222254"
                  className="text-white/70 hover:text-white text-sm transition-colors font-inter"
                >
                  08112222254
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-magenta flex-shrink-0" />
                <a
                  href="mailto:dzawani.marketing@gmail.com"
                  className="text-white/70 hover:text-white text-sm transition-colors font-inter"
                >
                  dzawani.marketing@gmail.com
                </a>
              </li>
            </ul>

            {/* Certifications */}
            <div className="mt-6">
              <p className="text-white/50 text-xs font-inter mb-2">
                {language === "en" ? "Registered & Licensed:" : "Terdaftar & Berizin:"}
              </p>
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
              &copy; {new Date().getFullYear()} Dzawani Tour. {t.footer.rights}
            </p>
            <div className="flex items-center gap-4">
              <Link href="/faq" className="text-white/50 hover:text-white text-sm transition-colors font-inter">
                FAQ
              </Link>
              <Link href="/faq?tab=syarat" className="text-white/50 hover:text-white text-sm transition-colors font-inter">
                {t.footer.terms}
              </Link>
              <Link href="/kontak" className="text-white/50 hover:text-white text-sm transition-colors font-inter">
                {t.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
