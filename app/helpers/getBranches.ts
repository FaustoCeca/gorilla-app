import prisma from "../libs/prismadb";

export const getBranches = async () => {
    try {
        const branches = await prisma.branch.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return branches;
    } catch (error:any) {
        throw new Error(error);
    }
}