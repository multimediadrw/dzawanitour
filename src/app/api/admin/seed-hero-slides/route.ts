import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const heroSlides = [
      {
        title: "Bali Paradise",
        titleEn: "Bali Paradise",
        subtitle: "Pulau Dewata yang Memukau",
        subtitleEn: "The Enchanting Island of Gods",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=90",
        order: 1,
        status: "active"
      },
      {
        title: "Istanbul & Cappadocia",
        titleEn: "Istanbul & Cappadocia",
        subtitle: "Keajaiban Dua Benua",
        subtitleEn: "The Wonder of Two Continents",
        image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1920&q=90",
        order: 2,
        status: "active"
      },
      {
        title: "Jepang Sakura",
        titleEn: "Japan Cherry Blossom",
        subtitle: "Negeri Matahari Terbit",
        subtitleEn: "Land of the Rising Sun",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=90",
        order: 3,
        status: "active"
      }
    ];

    for (const slide of heroSlides) {
      await prisma.heroSlide.create({
        data: slide
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Hero slides seeded successfully",
      count: heroSlides.length
    });
  } catch (error) {
    console.error("Error seeding hero slides:", error);
    return NextResponse.json(
      { error: "Failed to seed hero slides" },
      { status: 500 }
    );
  }
}
