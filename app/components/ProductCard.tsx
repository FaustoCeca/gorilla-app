'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../helpers/getCurrentUser";

interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    image: string;
    availableProp: boolean;
    category: string;
    id: string;
    showEditButton?: boolean;
}

const ProductCard = ({ name, description, price, image, availableProp, category, id, showEditButton }: ProductCardProps) => {
    const router = useRouter();

    return (
    <div className="flex flex-col md:flex-row justify-between w-full bg-slate-300 rounded-xl p-6 items-center">
        <Image 
            src={image}
            alt="Picture of the product"
            width={120}
            height={120}
            className="rounded-xl"
            style={{objectFit: 'cover'}}
        />
        <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-2xl font-bold mt-2 md:mt-0">
                {name}
            </h3>
            <p>
                {description}
            </p>
            <p>
                Precio: $ {price}
            </p>
        </div>
        <div className="flex flex-row items-center gap-3">
            {
                availableProp ? (
                    <p className="text-green-500">
                        Disponible
                    </p>
                ) : (
                    <p className="text-red-500">
                        No disponible
                    </p>
                )
            }
            {
                showEditButton && (
                    <button
                    className="bg-slate-500 text-white rounded-xl px-4 py-2"
                    onClick={() => router.push(`/editar/${id}`)}
                    >
                        Editar
                    </button>
                )
            }
        </div>
    </div>
  )
}

export default ProductCard;