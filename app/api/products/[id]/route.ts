import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    id: string;
}

export async function PUT( req : NextRequest,  { params }: { params:IParams } ) {
    const body = await req.json();
    const priceNumber = Number(body.price);
    const availableBoolean = Boolean(body.available);

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
            available: availableBoolean,
        },
    });


    return NextResponse.json(updatedProduct);
}

export async function DELETE( req : NextRequest,  { params }: { params:IParams } ) {
    const deletedProduct = await prisma.product.delete({
        where: {
            id: params.id,
        },
    });

    return NextResponse.json(deletedProduct);
}