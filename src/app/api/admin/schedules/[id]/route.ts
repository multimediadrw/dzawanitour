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

// GET single schedule
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    verifyToken(request);
    const schedule = await prisma.tripSchedule.findUnique({
      where: { id: params.id },
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
    const { destinasi, durasi, tanggalBerangkat, harga, kuota, tersisa, status, includes, tripCategory, category, slug, hasDetail } = body;

    const schedule = await prisma.tripSchedule.update({
      where: { id: params.id },
      data: {
        destinasi: destinasi !== undefined ? destinasi : undefined,
        durasi: durasi !== undefined ? durasi : undefined,
        tanggalBerangkat: tanggalBerangkat !== undefined ? tanggalBerangkat : undefined,
        harga: harga !== undefined ? parseInt(harga) : undefined,
        kuota: kuota !== undefined ? parseInt(kuota) : undefined,
        tersisa: tersisa !== undefined ? parseInt(tersisa) : undefined,
        status: status !== undefined ? status : undefined,
        includes: includes !== undefined ? includes : undefined,
        tripCategory: (tripCategory !== undefined ? tripCategory : category) !== undefined ? (tripCategory || category) : undefined,
        slug: slug !== undefined ? slug : undefined,
        hasDetail: hasDetail !== undefined ? hasDetail : undefined,
        updatedAt: new Date(),
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
