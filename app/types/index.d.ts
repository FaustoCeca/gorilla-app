import { Admin } from "@prisma/client";

type SafeAdmin = Omit<Admin,
    'createdAt' | 'updatedAt' | 'emailVerified' & {
        createdAt: string;
        updatedAt: string;
        emailVerified: string | null;
    }>

type CartItems = {
    id: string;
    name: string;
    price: number;
    quantity: number | undefined;
}

type Order = {
    id: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    client: string;
    address?: string;
    phone: number;
    paymentMethod: string;
    deliveryMethod: string;
    total: number;
    products: any;
    clarafications?: string;
    branch: string;  
}