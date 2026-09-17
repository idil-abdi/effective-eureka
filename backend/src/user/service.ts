import { ConflictException } from "../exception/ConflictException";
import { PrismaClient } from "../generated/prisma/client";
import { CreateUserPayload } from "./types";

export const createUserService = (prisma: PrismaClient) => ({
    async create(data: CreateUserPayload) {
        const existing = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existing) {
            throw new ConflictException('Employee already exists');
        }

        return prisma.user.create({
            data: { 
                ...data, 
                },
        });
    }
});


export type UserService = ReturnType<typeof createUserService>