import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';

export const getSession = async () => {
    return await getServerSession(authOptions);
}

export const getCurrentUser = async () => {
    try {
        const session = await getSession();
        if (!session) return null;

        const currentUser = await prisma.admin.findUnique({
            where: {
                email: session.user?.email as string
            }
        });

        if (!currentUser) return null;

        return {
            ...currentUser,
            // We do this because we can only pass plain objects to the client side from the serverside
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        };


    } catch (error: any) {
        return null;
    }
}