'use client'

import Img from '@/public/images/gorila-img.jpg'; 
import Image from 'next/image';
import useInfoModal from '../hooks/useInfoModal';

const BranchInfo = () => {
  const infoModal = useInfoModal();

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <Image 
        src={Img}
        alt="Gorila"
        width={150}
        height={150}
        style={{ objectFit: 'cover' }}
      />
      <button
        onClick={infoModal.onOpen}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        Horarios
      </button>
    </div>
  )
}

export default BranchInfo;