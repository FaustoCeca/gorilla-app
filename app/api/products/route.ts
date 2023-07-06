import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/helpers/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { z } from "zod";

export async function POST(request: NextRequest) {
    const isAdmin = await getCurrentUser();

    if (!isAdmin) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { name, description, imageSrc, category, price, available } = body;

    const productSchema = z.object({
        name: z.string().min(3).max(50),
        description: z.string().min(3).max(500),
        imageSrc: z.string().min(3).max(500),
        category: z.string().min(3).max(50),
        price: z.number().min(1),
        available: z.boolean(),
    });

    productSchema.parse(body);

    const priceNumber = Number(price);

    const product = await prisma.product.create({
        data: {
            name,
            description,
            category,
            image: imageSrc,
            price: priceNumber,
            available
        }
    });

    


    return NextResponse.json(product);
}