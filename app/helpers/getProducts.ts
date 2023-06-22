import prisma from "../libs/prismadb";

export const getProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        return products;
    } catch (error: any) {
        throw new Error(error);
    }
}