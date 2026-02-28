import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dzawani-secret-key-2024';

export const dynamic = 'force-dynamic';

function verifyToken(request: NextRequest) {
  let token = request.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    token = request.cookies.get('admin_token')?.value;
  }
  if (!token) {
    throw new Error('Unauthorized');
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// GET - Get single package by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    verifyToken(request);

    const package_ = await prisma.tourPackage.findUnique({
      where: { id: params.id },
    });

    if (!package_) {
      return NextResponse.json(
        { message: 'Paket tidak ditemukan' },
        { status: 404 }
      );
    }

    const response = NextResponse.json(package_);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;
  } catch (error: any) {
    console.error('GET package error:', error);
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' },
      { status: error.message === 'Unauthorized' || error.message === 'Invalid token' ? 401 : 500 }
    );
  }
}

// PUT - Update package
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    verifyToken(request);

    const body = await request.json();

    // Check if package exists
    const existingPackage = await prisma.tourPackage.findUnique({
      where: { id: params.id },
    });

    if (!existingPackage) {
      return NextResponse.json(
        { message: 'Paket tidak ditemukan' },
        { status: 404 }
      );
    }

    // Update slug if title changed
    let slug = existingPackage.slug;
    if (body.title && body.title !== existingPackage.title) {
      slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Update package
    const package_ = await prisma.tourPackage.update({
      where: { id: params.id },
      data: {
        ...body,
        slug,
        updatedAt: new Date(),
      },
    });

    // Revalidate all relevant pages
    revalidatePath('/open-trip');
    revalidatePath('/private-trip');
    revalidatePath(`/open-trip/${slug}`);
    revalidatePath(`/private-trip/${slug}`);
    revalidatePath('/admin/dashboard/packages');
    revalidatePath('/');

    return NextResponse.json({
      message: 'Paket berhasil diupdate',
      package: package_,
    });
  } catch (error: any) {
    console.error('PUT package error:', error);
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' },
      { status: error.message === 'Unauthorized' || error.message === 'Invalid token' ? 401 : 500 }
    );
  }
}

// DELETE - Delete package
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    verifyToken(request);

    // Check if package exists
    const existingPackage = await prisma.tourPackage.findUnique({
      where: { id: params.id },
    });

    if (!existingPackage) {
      return NextResponse.json(
        { message: 'Paket tidak ditemukan' },
        { status: 404 }
      );
    }

    // Delete package
    await prisma.tourPackage.delete({
      where: { id: params.id },
    });

    // Revalidate all relevant pages
    revalidatePath('/open-trip');
    revalidatePath('/private-trip');
    revalidatePath('/admin/dashboard/packages');
    revalidatePath('/');

    return NextResponse.json({
      message: 'Paket berhasil dihapus',
    });
  } catch (error: any) {
    console.error('DELETE package error:', error);
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' },
      { status: error.message === 'Unauthorized' || error.message === 'Invalid token' ? 401 : 500 }
    );
  }
}
