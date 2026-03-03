import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - All schedules for open-trip packages, optionally filtered by tripCategory
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (category) where.tripCategory = category;

    const schedules = await prisma.tripSchedule.findMany({
      where,
      select: {
        id: true,
        packageId: true,
        destinasi: true,
        durasi: true,
        tanggalBerangkat: true,
        harga: true,
        kuota: true,
        tersisa: true,
        status: true,
        includes: true,
        tripCategory: true,
        slug: true,
        hasDetail: true,
      },
      orderBy: { tanggalBerangkat: 'asc' },
    });

    return NextResponse.json({ schedules });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('GET all schedules error:', error);
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
