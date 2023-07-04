import prisma from "../libs/prismadb";

interface IParams {
    id: string;
}

export default async function getProdById(params : IParams) {
    try {
        const { id } = params;

        const product = await prisma.product.findUnique({
            where: {
                id: id
            },
        });

        if (!product) {
            return null
        }

        return product;
    } catch (error: any) {
        throw new Error(error);
    }
}