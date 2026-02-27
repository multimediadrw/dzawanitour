import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://dzawanitour.com"),
  title: {
    default: "Dzawani Tour — Paket Wisata Terbaik Domestik & Internasional",
    template: "%s | Dzawani Tour",
  },
  description:
    "Dzawani Tour menawarkan paket Open Trip dan Private Trip ke destinasi domestik dan internasional terbaik. Bali, Labuan Bajo, Turki, Jepang, dan banyak lagi. Harga terjangkau, pelayanan profesional.",
  keywords: [
    "dzawani tour",
    "dzawanitour",
    "paket wisata",
    "open trip",
    "private trip",
    "wisata domestik",
    "wisata internasional",
    "tour Bali",
    "tour Turki",
    "tour Jepang",
    "tour Labuan Bajo",
    "tour murah Bandung",
    "travel agent Bandung",
    "paket liburan",
    "wisata halal",
  ],
  authors: [{ name: "Dzawani Tour", url: "https://dzawanitour.com" }],
  creator: "Dzawani Tour",
  publisher: "Dzawani Tour",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "zU2ewryfafJvSWdTo2mB12rRO7iBf5KC2ogyHCx9mAY",
  },
  alternates: {
    canonical: "https://dzawanitour.com",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://dzawanitour.com",
    siteName: "Dzawani Tour",
    title: "Dzawani Tour — Paket Wisata Terbaik Domestik & Internasional",
    description:
      "Temukan paket Open Trip dan Private Trip terbaik ke destinasi impian Anda. Bali, Labuan Bajo, Turki, Jepang, dan banyak lagi. Harga terjangkau, pelayanan profesional.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dzawani Tour — Paket Wisata Terbaik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dzawani Tour — Paket Wisata Terbaik Domestik & Internasional",
    description:
      "Temukan paket Open Trip dan Private Trip terbaik ke destinasi impian Anda.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
