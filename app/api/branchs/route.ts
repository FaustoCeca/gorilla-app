import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';


export async function POST(request: NextRequest) {
    const body = await request.json();

    const { name, phone, address } = body;

    const branch = await prisma.branch.create({
        data: {
            name,
            phone,
            address
        }
    })

    return NextResponse.json(branch);
}
