import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

async function main() {
  console.log('Seeding hero slides...');
  
  for (const slide of heroSlides) {
    await prisma.heroSlide.create({
      data: slide
    });
    console.log(`✅ Created: ${slide.title}`);
  }
  
  console.log('✅ Hero slides seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding hero slides:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
