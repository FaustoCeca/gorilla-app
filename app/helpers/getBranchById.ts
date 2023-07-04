import prisma from "../libs/prismadb";


interface IParams {
    id: string;
}

export default async function getBranchById(params : IParams) {
    try {
        const { id } = params;

        const branch = await prisma.branch.findUnique({
            where: {
                id: id
            },
        });

        if (!branch) {
            return null;
        }

        return branch;
    } catch (error: any) {
        throw new Error(error);
    }
}