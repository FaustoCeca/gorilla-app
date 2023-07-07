'use client'

import { CartItems } from "@/app/types";
import useCart from "../../hooks/useCart";
import ItemsCart from "./ItemsCart";

const OrderCart = () => {
  const { addToCart, cart, clearCart, removeFromCart } = useCart();

  const calcQuantity = (id: string): number | undefined => {
    let quantity = 0;
    
    cart.forEach((item: CartItems) => {
      if (item.id === id) {
        quantity += 1;
      }
    });

    return quantity;
  }

  return (
    <div className="border-gray-400 border-[1px] p-2">
        <div className="flex flex-col gap-3 text-left">
          <div>
            {
             cart.map((item: CartItems, index: number) => (
              <ItemsCart
                key={index}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={calcQuantity(item.id)}
              />
             ))
            }
          </div>
          <hr />
          <div className="flex flex-row items-center justify-between">
            <p className="text-md font-bold">
              Total
            </p>
            <p className="text-md font-bold">
              $ {cart.reduce((acc: number, item: CartItems) => acc + item.price, 0)}
            </p>
          </div>
        </div>
    </div>
  )
}

export default OrderCart;