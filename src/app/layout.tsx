import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dzawani Tour - Your Colorful Journey Starts Here",
  description:
    "Dzawani Tour menawarkan paket wisata terbaik ke berbagai destinasi impian Anda. Temukan pengalaman perjalanan yang tak terlupakan bersama kami.",
  keywords:
    "tour, wisata, travel, paket wisata, dzawani, dzawanitour, liburan, perjalanan",
  openGraph: {
    title: "Dzawani Tour - Your Colorful Journey Starts Here",
    description:
      "Dzawani Tour menawarkan paket wisata terbaik ke berbagai destinasi impian Anda.",
    type: "website",
    locale: "id_ID",
    siteName: "Dzawani Tour",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
