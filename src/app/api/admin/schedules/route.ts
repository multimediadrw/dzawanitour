import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dzawanitour-secret-key-2026';

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

// GET - List schedules (optionally filtered by packageId)
export async function GET(request: NextRequest) {
  try {
    verifyToken(request);
    const { searchParams } = new URL(request.url);
    const packageId = searchParams.get('packageId') || '';
    const status = searchParams.get('status') || '';

    const where: any = {};
    if (packageId) where.packageId = packageId;
    if (status) where.status = status;

    const schedules = await prisma.tripSchedule.findMany({
      where,
      include: {
        package: {
          select: { id: true, title: true, slug: true, destination: true },
        },
      },
      orderBy: { departureDate: 'asc' },
    });

    return NextResponse.json({ schedules });
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
    const { packageId, departureDate, returnDate, price, quota, bookedCount, status, notes, notesEn } = body;

    if (!packageId || !departureDate) {
      return NextResponse.json({ message: 'packageId dan departureDate wajib diisi' }, { status: 400 });
    }

    // Auto-compute status based on quota
    let computedStatus = status || 'available';
    if (bookedCount >= quota) computedStatus = 'full';
    else if (bookedCount >= quota * 0.8) computedStatus = 'almost_full';

    const schedule = await prisma.tripSchedule.create({
      data: {
        packageId,
        departureDate: new Date(departureDate),
        returnDate: returnDate ? new Date(returnDate) : null,
        price: price ? parseInt(price) : null,
        quota: parseInt(quota) || 20,
        bookedCount: parseInt(bookedCount) || 0,
        status: computedStatus,
        notes: notes || null,
        notesEn: notesEn || null,
      },
      include: {
        package: { select: { id: true, title: true, slug: true } },
      },
    });

    return NextResponse.json({ message: 'Jadwal berhasil dibuat', schedule }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' },
      { status: error.message === 'Unauthorized' || error.message === 'Invalid token' ? 401 : 500 }
    );
  }
}
