import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { DatabaseError } from '@/app/types/errors';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log('Received email:', email);

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Try to save to database
    const subscriber = await prisma.waitingList.create({
      data: { email },
    });

    console.log('Saved subscriber:', subscriber);

    return NextResponse.json({ 
      success: true, 
      data: subscriber 
    });

  } catch (error: unknown) {
    console.error('API Error:', error);
    
    // Type guard to check if error is DatabaseError
    if (error instanceof Error && (error as DatabaseError).code === 'P2002') {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
