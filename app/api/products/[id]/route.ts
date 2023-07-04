import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    id: string | undefined;
}

export async function PUT( req : NextRequest, params: IParams ) {
    const body = await req.json();

    const priceNumber = Number(body.price);

    console.log(params.id);

    const updatedProduct = await prisma.product.update({
        where: {
            id: params.id,
        },
        data: {
            name: body.name,
            description: body.description,
            image: body.image,
            category: body.category,
            price: priceNumber,
            available: body.available,
        },
    });


    return NextResponse.json(updatedProduct);
}