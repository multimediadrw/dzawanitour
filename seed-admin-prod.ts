import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding admin user to production database...');

  const hashedPassword = await bcrypt.hash('Rahasiakita.88!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'multimediadrw@gmail.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'multimediadrw@gmail.com',
      username: 'multimediadrw',
      name: 'Admin Dzawani Tour',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Admin user seeded:', admin.email);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
