import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { z } from 'zod';


export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, phone, address, schedule } = body;

    const branchSchema = z.object({
        name: z.string().min(3).max(50),
        phone: z.string().min(3).max(50),
        address: z.string().min(3).max(50),
        schedule: z.string().min(3).max(100),
    });

    branchSchema.parse({ name, phone, address, schedule });

    const branch = await prisma.branch.create({
        data: {
            name,
            phone,
            address,
            schedule
        }
    })

    return NextResponse.json(branch);
}
