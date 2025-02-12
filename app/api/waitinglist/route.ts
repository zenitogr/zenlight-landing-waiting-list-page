import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import sgMail from '@sendgrid/mail';

const prisma = new PrismaClient();

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Save to database
    const subscriber = await prisma.waitingList.create({
      data: { email },
    });

    // Send confirmation email if SendGrid is configured
    if (process.env.SENDGRID_API_KEY) {
      await sgMail.send({
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yourapp.com',
        subject: 'Welcome to the Waiting List!',
        text: 'Thank you for joining our waiting list. We\'ll keep you updated on our progress!',
        html: '<p>Thank you for joining our waiting list. We\'ll keep you updated on our progress!</p>',
      });
    }

    return NextResponse.json({ success: true, data: subscriber });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 400 }
      );
    }
    
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
