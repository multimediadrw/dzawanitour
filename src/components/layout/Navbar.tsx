"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "/" },
  {
    label: "Open Trip",
    href: "/open-trip",
    children: [
      { label: "Wisata Domestik", href: "/open-trip?kategori=domestik" },
      { label: "Wisata Internasional", href: "/open-trip?kategori=internasional" },
    ],
  },
  {
    label: "Private Trip",
    href: "/private-trip",
    children: [
      { label: "Wisata Domestik", href: "/private-trip?kategori=domestik" },
      { label: "Wisata Internasional", href: "/private-trip?kategori=internasional" },
    ],
  },
  { label: "FAQ", href: "/faq" },
  { label: "Tentang", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-dzawani-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg font-poppins">D</span>
            </div>
            <div>
              <span
                className={`font-bold text-xl font-poppins transition-colors ${
                  isScrolled ? "text-purple" : "text-white"
                }`}
              >
                Dzawani
              </span>
              <span
                className={`font-bold text-xl font-poppins transition-colors ${
                  isScrolled ? "text-magenta" : "text-ocean"
                }`}
              >
                Tour
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors font-inter ${
                    isScrolled
                      ? "text-gray-700 hover:text-magenta hover:bg-magenta-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Link>

                {/* Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-magenta-50 hover:text-magenta transition-colors font-inter"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+6281234567890"
              className={`flex items-center gap-2 text-sm font-medium transition-colors font-inter ${
                isScrolled ? "text-gray-600 hover:text-magenta" : "text-white/90 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>+62 812-3456-7890</span>
            </a>
            <Link href="/kontak" className="btn-primary text-sm py-2.5 px-5">
              Pesan Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-5 py-3.5 text-gray-700 hover:bg-magenta-50 hover:text-magenta font-medium transition-colors font-inter border-b border-gray-50"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="bg-gray-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-8 py-2.5 text-sm text-gray-600 hover:text-magenta transition-colors font-inter"
                      >
                        → {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="p-4">
              <Link
                href="/kontak"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full text-center block"
              >
                Pesan Sekarang
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
