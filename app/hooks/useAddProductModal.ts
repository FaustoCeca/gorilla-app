import { create } from "zustand";

interface AddProductModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAddProductModal = create<AddProductModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useAddProductModal;