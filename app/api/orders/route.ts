import { NextRequest } from "next/server";
import prisma from "@/app/libs/prismadb";
import { z } from "zod";




export async function POST(request: NextRequest) {
    const body = await request.json();
    const { client, address, phone, paymentMethod, deliveryMethod, status, clarifications, products, total, branch } = body;

    const orderSchema = z.object({
        client: z.string(),
        address: z.string().min(3).max(500),
        phone: z.number().min(3).max(500),
        paymentMethod: z.string().min(3).max(50),
        deliveryMethod: z.string().min(3).max(50),
        status: z.string().min(3).max(50),
        clarifications: z.string().min(3).max(500),
        products: z.array(z.object({
            id: z.number(),
            name: z.string().min(3).max(50),
            description: z.string().min(3).max(500),
        })),
        total: z.number().min(1),
        branch: z.string().min(3).max(50),
    });
    
    orderSchema.parse({
        client,
        address,
        phone,
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
            phone,
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
}