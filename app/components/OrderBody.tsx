'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface OrderBodyProps {
    id: string,
    created: Date,
    status: string,
    total: number,
    client: string,
    address?: string | null,
    phone: number,
    paymentMethod: string,
    deliveryMethod: string,
    products: Array<{
        id: string,
        name: string,
        price: number,
        quantity: number,
    }>
    clarifications?: string | null,
    branch: string | null
    cashAmount?: number | null
}

const OrderBody = ({
    id,
    created,
    status,
    total,
    client,
    address,
    phone,
    paymentMethod,
    deliveryMethod,
    products,
    clarifications,
    branch,
    cashAmount
}: OrderBodyProps) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const router = useRouter();

    const generateOrderNumber = (id: string): string => {
        const indexInit = Math.floor((id.length - 3) / 3);
        return id.substring(indexInit, 3);
    }



    const handleChangeStatus = async (status: string) => {
        try {
            const response = await axios.put(`/api/orders/${id}`, { status }); 

            router.refresh();
            toast.success('Orden actualizada!');
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteOrder = async (id: string) => {
        try {
            const response = await axios.delete(`/api/orders/${id}`);
            
            router.refresh();
            toast.success('Orden eliminada!');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <tr 
            className='border-2 w-full border-gray-200 hover:bg-gray-100 cursor-pointer'
            onClick={() => setShowDetails(!showDetails)}
        >
            <td>
                {generateOrderNumber(id)}
            </td>
            <td>
                {client}
            </td>
            <td>
                {phone}
            </td>
            <td>
                {
                    deliveryMethod === 'takeaway' ? (
                        'Si'
                    ) : (
                        'No'
                    )
                }
            </td>
            <td>
                {total}
            </td>
            <td>
                {status}
            </td>
        </tr>
        {
            showDetails && (
                <div
                    className='border-2 w-full border-gray-200 hover:bg-gray-100 cursor-pointer'
                >
                    <h3
                        className='mb-1 text-lg text-red-500 items-start'
                    >
                        Productos:
                    </h3>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className='flex flex-row justify-between mr-2'
                        >
                            <p>
                                {product.name}
                            </p>
                            <p>
                                {product.price}
                            </p>
                        </div>
                    ))}
                    <hr />
                    <hr />
                    {
                        clarifications && (
                            <p className="py-2">
                                Aclaraciones: {clarifications}
                            </p>
                        )
                    }
                    {
                        paymentMethod === 'cash' && (
                            <p className="py-2">
                                Paga con: {cashAmount}
                            </p>
                        )
                    }
                    <hr />
                    {
                        status === 'Completado' ? (
                            <button
                                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-2'
                                onClick={() => handleChangeStatus('Pendiente')}
                            >
                                Pasar a pendiente
                            </button>
                        ) : (
                            <button
                                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-2'
                                onClick={() => handleChangeStatus('Completado')}
                            >
                                Pasar a completado
                            </button>
                        )
                    }
                    <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-2 block'
                        onClick={() => handleDeleteOrder(id)}
                    >
                        Eliminar orden
                    </button>
                </div>
            )
        }
    </>
  )
}

export default OrderBody;