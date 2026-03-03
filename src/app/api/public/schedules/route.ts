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

    let resolvedPackageId = packageId;
    if (slug && !packageId) {
      const pkg = await prisma.tourPackage.findUnique({
        where: { slug },
        select: { id: true },
      });
      if (!pkg) {
        return NextResponse.json({ schedules: [] });
      }
      resolvedPackageId = pkg.id;
    }

    const schedules = await prisma.tripSchedule.findMany({
      where: {
        packageId: resolvedPackageId,
        status: { not: 'Penuh' },
      },
      select: {
        id: true,
        tanggalBerangkat: true,
        departureDate: true,
        harga: true,
        kuota: true,
        tersisa: true,
        status: true,
        includes: true,
        durasi: true,
        destinasi: true,
        slug: true,
        hasDetail: true,
      },
      orderBy: { tanggalBerangkat: 'asc' },
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
