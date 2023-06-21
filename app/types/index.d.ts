import { Admin } from "@prisma/client";

type SafeAdmin = Omit<Admin,
    'createdAt' | 'updatedAt' | 'emailVerified' & {
        createdAt: string;
        updatedAt: string;
        emailVerified: string | null;
    }>