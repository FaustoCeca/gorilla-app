'use client'

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io'

interface SidebarMenuProps {
  isOpen?: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const Menu = ({isOpen, onClose, content}: SidebarMenuProps) => {

  const [showMenu, setShowMenu] = useState<boolean | undefined>(isOpen);

  useEffect(() => {
    setShowMenu(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowMenu(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  return (
    <div className={`absolute h-[100vh] z-40 w-full sm:w-[40vw] md:w-[30vw] lg:w-[20vw] bg-white pl-9 py-7
      transition-all duration-300 ease-in-out transform overflow-x-hidden ${isOpen ? 'left-0' : 'left-[-100%]'}`}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-red-700 hover:text-red-900"
        >
          <IoMdClose size={24} />
        </button>
      {content}
    </div>
  )
}

export default Menu;