import mercadopago from "mercadopago";
import { CartItems } from "@/app/types";
import { NextApiRequest, NextApiResponse } from "next";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";

mercadopago.configure({
    access_token: process.env.NEXT_ACCESS_TOKEN!,
});

// export async function POST ()

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method === "POST") {
//         const products: CartItems[] = req.body.products;

//         const URL = "https://localhost:3000";

//         try {
//             const preference: CreatePreferencePayload = {
//                 items: products.map((product: CartItems) => {
//                     return {
//                         title: product.name,
//                         unit_price: product.price,
//                         currency_id: "ARS",
//                         quantity: 1,
//                     }
//                 }),
//                 auto_return: "approved",
//                 back_urls: {
//                     success: `${URL}/success`,
//                     failure: `${URL}/failure`,
//                 },
//                 notification_url: `${URL}/api/notify`,
//             }

//             const response = await mercadopago.preferences.create(preference);

//             res.status(200).send({ url: response.body.init_point });
            
//         } catch (error) {
            
//         }
//     } else {
//         res.status(405).json({ message: "Method not allowed" });
//     }
// }

