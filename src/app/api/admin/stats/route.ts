import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dzawani-secret-key-2024';

export async function GET(request: NextRequest) {
  try {
    // Verify token
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get stats
    const [totalPackages, totalDestinations, totalTestimonials, totalFaqs] = await Promise.all([
      prisma.tourPackage.count(),
      prisma.destination.count(),
      prisma.testimonial.count(),
      prisma.fAQ.count(),
    ]);

    return NextResponse.json({
      totalPackages,
      totalDestinations,
      totalTestimonials,
      totalFaqs,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
