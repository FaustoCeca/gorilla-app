import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from '@/app/libs/prismadb';

export async function POST(request: NextRequest) {
    const body = await request.json();

    const { email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.admin.create({
        data: {
            email,
            hashedPassword
        }
    });

    return NextResponse.json(user);
}