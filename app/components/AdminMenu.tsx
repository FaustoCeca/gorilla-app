'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import { signOut } from 'next-auth/react';
import { SafeAdmin } from '../types';
import useBranchModal from '../hooks/useBranchModal';
import useProductModal from '../hooks/useProductModal';

interface AdminMenuProps {
    currentUser?: any;
}

const AdminMenu = ({ currentUser }: AdminMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const branchModal = useBranchModal();
    const productModal = useProductModal();

    const handleOpen = useCallback(() => {
        setIsOpen( (value) => !value );
    }, []);

    const handleBranch = useCallback(() => {
        branchModal.onOpen();
    }, [ branchModal ]);

    const handleProduct = useCallback(() => {
        productModal.onOpen();
    }, [ productModal ]);

  return (
    <div className='relative'>
                <div className="flex flex-row items-center gap-3">
                <div 
                    onClick={handleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition duration-300 ease-in-out"
                >
                    Opciones Admin
                </div>
            </div>
            {isOpen && (
                <div className="z-50 absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col gap-2 cursor-pointer">
                        {
                            currentUser && (
                                <>
                                    <MenuItem label="Agregar nueva sucursal" onClick={handleBranch} />
                                    <MenuItem label="Agregar nuevo producto" onClick={handleProduct} />
                                    <MenuItem label="Lista de productos" onClick={ () => {}} />
                                    <MenuItem label="Productos por sucursal" onClick={ () => {}} />
                                    <MenuItem label="Lista de sucursales" onClick={ () => {}} />
                                    <MenuItem label="Lista de ordenes" onClick={ () => {}} />
                                    <hr />
                                    <MenuItem label="Logout" onClick={() => signOut()} />
                                </>
                                )
                        }
                    </div>
                </div>
            )}
    </div>
    )
}

export default AdminMenu;