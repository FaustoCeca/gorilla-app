import { create } from "zustand";

interface CartStore {
    cart: any[];
    addToCart: (item: any) => void;
    removeFromCart: (item: any) => void;
    clearCart: () => void;
}

const useCart = create<CartStore>((set) => ({
    cart: [],
    addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
    removeFromCart: (item) => set((state) => ({ cart: state.cart.filter((i) => i.id !== item.id) })),
    clearCart: () => set({ cart: [] }),
}));

export default useCart;