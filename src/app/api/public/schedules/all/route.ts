import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - All future schedules for open-trip packages, optionally filtered by category
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || ''; // 'domestic' | 'international'

    const wherePackage: any = {
      type: 'open-trip',
    };
    if (category === 'domestic') {
      wherePackage.category = 'domestic';
    } else if (category === 'international') {
      wherePackage.category = 'international';
    }

    const schedules = await prisma.tripSchedule.findMany({
      where: {
        status: { not: 'cancelled' },
        departureDate: { gte: new Date() },
        package: wherePackage,
      },
      select: {
        id: true,
        departureDate: true,
        returnDate: true,
        price: true,
        quota: true,
        bookedCount: true,
        status: true,
        notes: true,
        package: {
          select: {
            id: true,
            title: true,
            slug: true,
            destination: true,
            duration: true,
            price: true,
            includes: true,
            category: true,
          },
        },
      },
      orderBy: { departureDate: 'asc' },
    });

    return NextResponse.json({ schedules });
  } catch (error: any) {
    console.error('GET all schedules error:', error);
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
