'use client'

import { CartItems } from "@/app/types";
import useCart from "../../hooks/useCart";
import ItemsCart from "./ItemsCart";
import Button from "../Buttons/Button";
import useOrderModal from "@/app/hooks/useOrderModal";

const OrderCart = () => {
  const { cart, clearCart, removeFromCart } = useCart();
  const { onOpen } = useOrderModal();

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
        <div className="mt-5">
          <Button 
            label="Vaciar"
            onClick={() => clearCart()}
            disabled={cart.length === 0}
            outline
          />
          <div className="mt-2">
            <Button 
              label="Ordenar"
              onClick={onOpen}
              disabled={cart.length === 0}
            />
          </div>
        </div>
    </div>
  )
}

export default OrderCart;