import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    id: string;
}

export async function PUT( req : NextRequest, { params }: { params:IParams } ) {
    const body = await req.json();

    console.log(params.id);

    const updatedOrder = await prisma.order.update({
        where: {
            id: params.id,
        },
        data: {
            status: body.status,
        },
    });


    return NextResponse.json(updatedOrder);
}