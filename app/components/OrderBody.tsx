'use client';

import { useState } from "react";

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
        total: number
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

  return (
        <tr 
            className='border-2 w-full border-gray-200 hover:bg-gray-100 cursor-pointer'
            onClick={() => setShowDetails(!showDetails)}
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
                {deliveryMethod}
            </td>
            <td>
                {total}
            </td>
            <td>
                {status}
            </td>
        </tr>
  )
}

export default OrderBody;