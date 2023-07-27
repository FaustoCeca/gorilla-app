'use client';

import axios from "axios";
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
    branch
}: OrderBodyProps) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);

    const changeStatus = async (status: string) => {
        try {
            const response = await axios.put(`/api/orders/${id}`, { status }); 

            toast.success('Orden actualizada!');
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
        <tr 
            className='border-2 w-full border-gray-200 hover:bg-gray-100 cursor-pointer'
            onClick={() => setShowDetails(!showDetails)}
            onDoubleClick={() => changeStatus('Completado')}
        >
            <td>
                {id}
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
                    {
                        deliveryMethod === 'delivery' && (
                            <p className="py-2">
                               Entregar en: {address}
                            </p>
                        )
                    }
                    <hr />
                    {
                        clarifications && (
                            <p className="py-2">
                                Aclaraciones: {clarifications}
                            </p>
                        )
                    }
                    {/* TODO */}
                    {/* {
                        paymentMethod === 'cash' && (
                            <p className="py-2">
                                Pago en efectivo
                            </p>
                        )
                    } */}
                </div>
            )
        }
    </>
  )
}

export default OrderBody;