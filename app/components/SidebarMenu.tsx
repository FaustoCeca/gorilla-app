'use client'

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface SidebarMenuProps {
  isOpen?: boolean;
  onClose: () => void;
}

const SidebarMenu = ({isOpen, onClose}: SidebarMenuProps) => {

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
    <div className={`absolute h-[100vh] w-full md:w-[20vw] bg-white px-4 py-5
      transition-all duration-300 ease-in-out transform ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col justify-between items-center">
          <div className="flex flex-col gap-2 md:gap-3 text-left">
            <h3 className="font-semibold text-red-700">
              Gorilla app
            </h3>
            <Link className="text-grey-700 hover:text-red-700" href="/">
              Inicio
            </Link>
            <Link className="text-grey-700 hover:text-red-700" href="/">
              Registrarse
            </Link>
            <Link className="text-grey-700 hover:text-red-700" href="/">
              Ingresar
            </Link>
          </div>
          <div className="font-light text-gray-800">
            Terminos y condiciones
          </div>
        </div>
        
    </div>
  )
}

export default SidebarMenu;