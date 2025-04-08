// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import {prisma} from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(NEXT_AUTH);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  // Only show non-admin users
const users = await prisma.user.findMany({
  where: {
    role: { not: "ADMIN" },
  },
  select: {
    id: true,
    name: true,
    email: true,
    image: true,
    role: true,
    otp: {
      select: {
        verified: true,
      },
    },
  },
});


  return NextResponse.json(users);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(NEXT_AUTH);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { userId } = await req.json();

  await prisma.user.delete({ where: { id: userId } });
  return NextResponse.json({ message: "User deleted" });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(NEXT_AUTH);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { userId, block } = await req.json();

  await prisma.user.update({
    where: { id: userId },
    data: {
      otp: {
        update:{
          verified:!block,
        },
      },
    },
  });
  

  return NextResponse.json({ message: `User ${block ? "blocked" : "unblocked"}` });
}
