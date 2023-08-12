import prisma from "../libs/prismadb";

export const getOrders = async () => {
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                id: 'desc'
            }
        });

        return orders;
    } catch (error: any) {
        throw new Error(error);
    }

}