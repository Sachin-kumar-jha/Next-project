import { NextResponse } from 'next/server';
import { transporter } from '@/lib/mailer';
import { generateOtp } from '@/utils/generateOtp';
import { prisma } from '@/lib/prisma';
import { expiryDate } from '@/utils/ExpriryDate';

export async function POST(req: Request) {
  try {
    const { email, userId } = await req.json();

    if (!email || !userId) {
      return NextResponse.json({ success: false, message: 'Email and userId are required.' }, { status: 400 });
    }

    const otp = generateOtp();

    await prisma.otp.upsert({
      where: { userId },
      update: {
        code: otp,
        expiresAt:expiryDate,
      },
      create: {
        userId,
        code: otp,
        expiresAt:expiryDate,
      },
    });

    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('OTP generation error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
