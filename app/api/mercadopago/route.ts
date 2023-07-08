import { NextRequest, NextResponse } from "next/server";
import mercadopago from "mercadopago";
import { CartItems } from "@/app/types";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { products } = body;

    mercadopago.configure({
        access_token: 'TEST-5311257409794805-070811-aaa32860a67a3128898208d65a28c947-1417329055'
    });

    const result = await mercadopago.preferences.create({
        items: products.map((product: CartItems) => ({
            title: product.name,
            unit_price: product.price,
            currency_id: 'ARS',
            quantity: 1,
        })),
    });

    console.log(result.body);
 
    return NextResponse.redirect(result.body.init_point);
}