import mercadopago from "mercadopago";

export async function POST (req: Request, res: Response) {
    const URL = "https://localhost:3000";
    
    console.log(req.body);

    // try {
    //     const preference = {
    //         items: products.map((product: any) => {
    //             return {
    //                 title: product.name,
    //                 unit_price: product.price,
    //                 currency_id: "ARS",
    //                 quantity: 1,
    //             }
    //         }),
    //         auto_return: "approved",
    //         back_urls: {
    //             success: `${URL}/success`,
    //             failure: `${URL}/failure`,
    //         },
    //         notification_url: `${URL}/api/notify`,
    //     }

    //     // const response = await mercadopago.preferences.create(preference);

    //     // return response.body.init_point;
        
    // } catch (error) {
        
    // }
}