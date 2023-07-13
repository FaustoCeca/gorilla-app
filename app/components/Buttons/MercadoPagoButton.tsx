import { CartItems } from "@/app/types";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";

interface MercadoPagoButtonProps {
    products: CartItems[];
}

const MercadoPagoButton = ({products}: MercadoPagoButtonProps) => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        const getMercadoPagoLink = async () => {
            setIsLoading(true);

            try {
                const response = await axios.post('/api/mercadopago', {
                    products,
                });

                setUrl(response.data.url);
            } catch (error) {
                console.log(error);
            }
        }


        setIsLoading(false);
        getMercadoPagoLink();
    }, [products]);
    
    return (
        <div>
            {
                isLoading ? (
                    <button
                        className="w-fit decoration-none bg-[#3483fa] px-8 h-12 rounded-lg border-none cursor-pointer text-white flex items-center justify-center gap-3 text-lg" 
                        disabled
                    >
                        <Loader />
                    </button>
                ) : (
                    <a 
                        className="w-fit decoration-none bg-[#3483fa] px-8 h-12 rounded-lg border-none cursor-pointer text-white flex items-center justify-center gap-3 text-lg" 
                        href={url}
                    >
                        Pagar con Mercado Pago
                    </a>
                )
            }
        </div>
    )
}

export default MercadoPagoButton;