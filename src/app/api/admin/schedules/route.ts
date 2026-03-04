import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export const dynamic = "force-dynamic";

const JWT_SECRET = process.env.JWT_SECRET || 'dzawani-secret-key-2024';

function verifyToken(request: NextRequest) {
  let token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    token = request.cookies.get('admin_token')?.value;
  }
  if (!token) throw new Error('Unauthorized');
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error('Invalid token');
  }
}

// GET - List schedules (optionally filtered by packageId or tripCategory)
export async function GET(request: NextRequest) {
  try {
    verifyToken(request);
    const { searchParams } = new URL(request.url);
    const packageId = searchParams.get('packageId') || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (packageId) where.packageId = packageId;
    if (category) where.tripCategory = category;
    if (status) where.status = status;

    const schedules = await prisma.tripSchedule.findMany({
      where,
      orderBy: { tanggalBerangkat: 'asc' },
    });

    return NextResponse.json({ schedules });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' },
      { status: error.message === 'Unauthorized' || error.message === 'Invalid token' ? 401 : 500 }
    );
  }
}

// POST - Create new schedule
export async function POST(request: NextRequest) {
  try {
    verifyToken(request);
    const body = await request.json();
    const { packageId, destinasi, durasi, tanggalBerangkat, harga, kuota, tersisa, status, includes, tripCategory, category, slug, hasDetail } = body;

    if (!packageId || !tanggalBerangkat) {
      return NextResponse.json({ message: 'packageId dan tanggalBerangkat wajib diisi' }, { status: 400 });
    }

    const schedule = await prisma.tripSchedule.create({
      data: {
        packageId,
        destinasi: destinasi || '',
        durasi: durasi || '',
        tanggalBerangkat,
        harga: parseInt(harga) || 0,
        kuota: parseInt(kuota) || 20,
        tersisa: parseInt(tersisa) || parseInt(kuota) || 20,
        status: status || 'Tersedia',
        includes: includes || '',
        tripCategory: tripCategory || category || 'domestik',
        slug: slug || null,
        hasDetail: hasDetail || false,
      },
    });

    return NextResponse.json({ message: 'Jadwal berhasil dibuat', schedule }, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' },
      { status: error.message === 'Unauthorized' || error.message === 'Invalid token' ? 401 : 500 }
    );
  }
}
