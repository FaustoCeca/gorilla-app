import { create } from "zustand";
import { CartItems } from "../types";

interface CartStore {
    cart: CartItems[];
    addToCart: (item: CartItems) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

const useCart = create<CartStore>((set) => ({
    cart: [],
    addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
    removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
    clearCart: () => set({ cart: [] }),
}));

export default useCart;