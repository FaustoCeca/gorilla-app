import prisma from '@/app/libs/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter your email and password');
                }

                const admin = await prisma.admin.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!admin) {
                    throw new Error('No user found');
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, admin.hashedPassword);

                if (!isCorrectPassword) {
                    throw new Error('Incorrect password');
                }

                return admin;
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    }
}

export default NextAuth(authOptions);