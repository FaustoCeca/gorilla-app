'use client'

import Menu from './Menu';
import Link from 'next/link';
import useSidebarMenu from '@/app/hooks/useSidebarMenu';

const SidebarMenu = () => {
    const { isOpen, onClose, onOpen } = useSidebarMenu();

    const sidebarContent = (
        <>
            <div className="flex flex-col h-full justify-between">
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
        </>
    )

  return (
    <Menu
        isOpen={isOpen}
        onClose={onClose}
        content={sidebarContent}
    />
  )
}

export default SidebarMenu;