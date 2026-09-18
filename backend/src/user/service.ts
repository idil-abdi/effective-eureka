import { ConflictException } from "../exception/ConflictException";
import { NotFoundException } from "../exception/NotFoundException";
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
    },
    async getAll() {
        return prisma.user.findMany({
            include: {
                categories: true,
            }
        });
    },
    async getById(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                categories: true,
            }
        });     

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }
});


export type UserService = ReturnType<typeof createUserService>