import { create } from "zustand";

interface BranchModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useBranchModal = create<BranchModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useBranchModal;