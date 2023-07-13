import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { z } from "zod";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { client, address, phone, paymentMethod, deliveryMethod, status, clarifications, products, total, branch } = body;
    const phoneNumber = Number(phone);

    const orderSchema = z.object({
        client: z.string(),
        address: z.string().max(100).optional(),
        phone: z.number(),
        paymentMethod: z.string().max(50),
        deliveryMethod: z.string().max(50),
        status: z.string().max(50),
        clarifications: z.string().max(500),
        cash: z.coerce.number().optional(),
        products: z.array(z.object({
            id: z.string(),
            name: z.string().max(50),
            price: z.number().min(0),
            quantity: z.number().min(1),
        })),
        total: z.number().min(1),
        branch: z.string().max(50),
    });
    
    orderSchema.parse({
        client,
        address,
        phone: phoneNumber,
        paymentMethod,
        deliveryMethod,
        status,
        clarifications,
        products,
        total,
        branch
    });

    const order = await prisma.order.create({
        data: {
            client,
            address,
            phone: phoneNumber,
            status,
            total,
            branch,
            clarifications,
            products,
            paymentMethod,
            deliveryMethod,
        }
    });

    console.log(order);

    return NextResponse.json(order);
}