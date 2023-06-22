import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    productId: string;
}

export async function PUT ({ params }: { params: IParams }) {
    const { productId } = params;

    if (!productId) {
        return NextResponse.error();
    }
}