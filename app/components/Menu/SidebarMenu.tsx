'use client'

import Menu from './Menu';
import Link from 'next/link';
import useSidebarMenu from '@/app/hooks/useSidebarMenu';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

const SidebarMenu = () => {
    const { isOpen, onClose, onOpen } = useSidebarMenu();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

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
                    <Link className="text-grey-700 hover:text-red-700" href="/sucursal/rosario">
                        Sucursal Rosario
                    </Link>
                    <Link className="text-grey-700 hover:text-red-700" href="/sucursal/fisherton">
                        Sucursal Fisherton
                    </Link>
                </div>
                <div className="font-light text-gray-800">
                    <p
                        onClick={registerModal.onOpen}
                        className="cursor-pointer hover:text-red-700 transition flex items-center gap-1"
                    >
                        Registro
                    </p>
                    <p
                        onClick={loginModal.onOpen}
                        className="cursor-pointer hover:text-red-700 transition flex items-center gap-1"
                    >
                        <span>Vendedor?</span> Ingresa
                    </p>                    
                    <p>
                        Terminos y condiciones
                    </p>
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