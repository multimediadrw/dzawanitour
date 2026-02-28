import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

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

// GET single schedule
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    verifyToken(request);
    const schedule = await prisma.tripSchedule.findUnique({
      where: { id: params.id },
      include: {
        package: { select: { id: true, title: true, slug: true, destination: true } },
      },
    });
    if (!schedule) {
      return NextResponse.json({ message: 'Jadwal tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json(schedule);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' },
      { status: error.message === 'Unauthorized' || error.message === 'Invalid token' ? 401 : 500 }
    );
  }
}

// PUT - Update schedule
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    verifyToken(request);
    const body = await request.json();
    const { departureDate, returnDate, price, quota, bookedCount, status, notes, notesEn } = body;

    const quota_ = parseInt(quota) || 20;
    const booked_ = parseInt(bookedCount) || 0;

    // Auto-compute status
    let computedStatus = status || 'available';
    if (booked_ >= quota_) computedStatus = 'full';
    else if (booked_ >= quota_ * 0.8) computedStatus = 'almost_full';

    const schedule = await prisma.tripSchedule.update({
      where: { id: params.id },
      data: {
        departureDate: departureDate ? new Date(departureDate) : undefined,
        returnDate: returnDate ? new Date(returnDate) : null,
        price: price !== undefined ? (price ? parseInt(price) : null) : undefined,
        quota: quota_,
        bookedCount: booked_,
        status: computedStatus,
        notes: notes !== undefined ? notes : undefined,
        notesEn: notesEn !== undefined ? notesEn : undefined,
        updatedAt: new Date(),
      },
      include: {
        package: { select: { id: true, title: true, slug: true } },
      },
    });

    return NextResponse.json({ message: 'Jadwal berhasil diupdate', schedule });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' },
      { status: error.message === 'Unauthorized' || error.message === 'Invalid token' ? 401 : 500 }
    );
  }
}

// DELETE - Delete schedule
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    verifyToken(request);
    await prisma.tripSchedule.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Jadwal berhasil dihapus' });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' },
      { status: error.message === 'Unauthorized' || error.message === 'Invalid token' ? 401 : 500 }
    );
  }
}
