import { create } from "zustand";

interface SidebarMenuStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSidebarMenu = create<SidebarMenuStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSidebarMenu;