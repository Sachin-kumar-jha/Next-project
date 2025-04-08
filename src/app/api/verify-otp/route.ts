import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { NewDate } from '@/utils/ExpriryDate';

export async function POST(req: Request) {
  try {
    const { userId, enteredOtp } = await req.json();
    console.log("Verifying:", userId, enteredOtp);

    if (!userId || !enteredOtp) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {id:userId},
      include:{
        otp:true,
      }
    });

    if (!user || !user?.otp || user?.otp?.code !== enteredOtp || user?.otp?.expiresAt <  NewDate ) { 
      return NextResponse.json({ success: false, message: 'Invalid or expired OTP' }, { status: 400 });
    }


   await prisma.otp.update({
      where: { userId:userId},
      data: { verified: true },
    });
    //await prisma.otp.delete({ where: { userId:userId } });
    return NextResponse.json({ success: true }, { status: 200 });
  }catch{
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
