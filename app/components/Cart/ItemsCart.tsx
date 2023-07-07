'use client'

import { CartItems } from "@/app/types";


const ItemsCart = ({ name,  price, id, quantity }: CartItems) => {

    return (
    <div className="flex flex-row justify-between items-center">
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