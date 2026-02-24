const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding admin user...');

  // Hash password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      id: 'admin-' + Date.now(),
      username: 'admin',
      email: 'admin@dzawanitour.com',
      password: hashedPassword,
      name: 'Administrator',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log('✅ Admin user created:');
  console.log('   Username: admin');
  console.log('   Password: admin123');
  console.log('   Email:', admin.email);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
