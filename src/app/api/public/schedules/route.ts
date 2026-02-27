import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Public schedules by packageId or slug
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const packageId = searchParams.get('packageId') || '';
    const slug = searchParams.get('slug') || '';

    if (!packageId && !slug) {
      return NextResponse.json({ message: 'packageId atau slug wajib diisi' }, { status: 400 });
    }

    let pkg = null;
    if (slug) {
      pkg = await prisma.tourPackage.findUnique({
        where: { slug },
        select: { id: true },
      });
      if (!pkg) {
        return NextResponse.json({ schedules: [] });
      }
    }

    const resolvedPackageId = packageId || pkg?.id;

    const schedules = await prisma.tripSchedule.findMany({
      where: {
        packageId: resolvedPackageId,
        status: { not: 'cancelled' },
        departureDate: { gte: new Date() }, // Only future dates
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
        notesEn: true,
      },
      orderBy: { departureDate: 'asc' },
    });

    return NextResponse.json({ schedules });
  } catch (error: any) {
    console.error('GET public schedules error:', error);
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
