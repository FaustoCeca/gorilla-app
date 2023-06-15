import { MdOutlineDeliveryDining } from 'react-icons/md';
import {AiOutlineShopping} from 'react-icons/ai';


interface BranchCardProps {
    title: string;
    address: string;
}


const BranchCard = ({title, address}: BranchCardProps) => {
  return (
    <div className="rounded-md bg-white m-4 p-4 shadow-md cursor-pointer">
        <h3 className="text-black text-2xl font-semibold">
            {title}
        </h3>
        <p className="pb-2 text-sm">
            {address}
        </p>
        <div className="flex flex-row justify-between items-center border-t-[1.5px] border-gray-300 pt-2 mt-2">
            <div className="flex flex-row items-center gap-2">
                <MdOutlineDeliveryDining size={18} />
                <p className="text-sm">Delivery</p>
            </div>
            <div className="flex flex-row items-center gap-2">
                <AiOutlineShopping size={18} />
                <p className="text-sm">
                    Take away
                </p>
            </div>
            <p className='bg-blue-300 p-1 text-xs rounded-md font-medium'>
                Pago Online
            </p>
        </div>
    </div>
  )
}

export default BranchCard;