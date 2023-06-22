'use client'

import Image from "next/image";
import AvailableInput from "./Inputs/AvailableInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    image: string;
    availableProp: boolean;
    category: string;
}

const ProductCard = ({ name, description, price, image, availableProp, category }: ProductCardProps) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
          available: true,
        }
      });

    
    return (
    <div className="flex flex-row justify-between w-full bg-slate-300 rounded-xl px-3 py-2 items-center">
        <Image 
            src={image}
            alt="Picture of the product"
            width={100}
            height={100}
            className="rounded-xl"
            style={{objectFit: 'cover'}}
        />
        <div className="flex flex-col gap-2 text-left">
            <h3>
                {name}
            </h3>
            <p>
                {description}
            </p>
            <p>
                Precio: $ {price}
            </p>
        </div>
        <p>
            {category}
        </p>
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
            <AvailableInput 
                available={availableProp}
                onClick={() => console.log('click')}
            />
        </div>
    </div>
  )
}

export default ProductCard;