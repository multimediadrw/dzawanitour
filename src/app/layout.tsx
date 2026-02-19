import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "Dzawani Tour - Your Colorful Journey Starts Here",
  description:
    "Dzawani Tour menawarkan paket wisata terbaik ke berbagai destinasi impian Anda. Temukan pengalaman perjalanan yang tak terlupakan bersama kami.",
  keywords:
    "tour, wisata, travel, paket wisata, dzawani, dzawanitour, liburan, perjalanan",
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
  openGraph: {
    title: "Dzawani Tour - Your Colorful Journey Starts Here",
    description:
      "Dzawani Tour menawarkan paket wisata terbaik ke berbagai destinasi impian Anda.",
    type: "website",
    locale: "id_ID",
    siteName: "Dzawani Tour",
    images: [{ url: "/logo-icon.png" }],
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
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
