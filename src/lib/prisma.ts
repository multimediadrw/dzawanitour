import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

// Create connection pool only if DATABASE_URL is available
let adapter: PrismaPg | undefined;

if (process.env.DATABASE_URL) {
  const pool = globalForPrisma.pool ?? new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  
  if (process.env.NODE_ENV !== 'production') globalForPrisma.pool = pool;
  
  // Create adapter
  adapter = new PrismaPg(pool);
}

// Create Prisma Client with adapter (if available)
export const prisma = globalForPrisma.prisma ?? (adapter 
  ? new PrismaClient({ adapter })
  : new PrismaClient());

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
