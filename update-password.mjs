import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating admin password...');

  const hashedPassword = await bcrypt.hash('Rahasiakita.88!', 10);
  
  console.log('New hashed password:', hashedPassword);

  const admin = await prisma.user.update({
    where: { email: 'multimediadrw@gmail.com' },
    data: {
      password: hashedPassword,
    },
  });

  console.log('✅ Password updated for:', admin.email);
}

main()
  .catch((e) => {
    console.error('❌ Error updating password:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
