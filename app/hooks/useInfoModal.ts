import { create } from "zustand";

interface InfoModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useInfoModal = create<InfoModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useInfoModal;