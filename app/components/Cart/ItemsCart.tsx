'use client'

import useCart from "@/app/hooks/useCart";
import { CartItems } from "@/app/types";


const ItemsCart = ({ name,  price, id, quantity }: CartItems) => {
    const { removeFromCart } = useCart();

    return (
    <div 
        className="flex flex-row justify-between items-center border-gray-400 border-[1px] p-2 rounded-md"
        onClick={() => removeFromCart({
            id,
            name,
            price,
            quantity: 1
        })}
    >
        <div className="flex flex-row gap-1 items-center">
            <p className="text-sm text-[#fd4f57] font-semibold">
                {quantity}x
            </p>
            <p className="text-sm font-semibold">
                {name}
            </p>
        </div>
        <p className="text-sm font-semibold">
            $ {price}
        </p>
    </div>
  )
}

export default ItemsCart;