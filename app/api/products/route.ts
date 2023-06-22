import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/helpers/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(request: NextRequest) {
    const isAdmin = await getCurrentUser();

    if (!isAdmin) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { name, description, imageSrc, category, price, available } = body;

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