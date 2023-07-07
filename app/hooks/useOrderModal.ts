import { create } from "zustand";

interface OrderModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useOrderModal = create<OrderModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useOrderModal;