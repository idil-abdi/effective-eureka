import { Category } from './../generated/prisma/browser';
import { CreateCategoryPayload } from './types';
import { PrismaClient } from "../generated/prisma/client";
import { NotFoundException } from '../exception/NotFoundException';

export const createCategoryService = (prisma: PrismaClient) => ({
    async create(data: CreateCategoryPayload, userId: string) {
        const cleanedName = data.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException(`User with ID: ${userId} not found`);
        }

        const category = await prisma.category.create({
            data: {
                name: cleanedName,
                icon: data.icon,
                user: {
                    connect: { id: userId }
                }
            },
            select: {
                id: true,
                name: true,
                icon: true,
                createdAt: true,
                userId: true
            }
        });

        return {
            success: true,
            data: category
        };
    },

    async getAll(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId},
        })

        if (!user) {
            throw new NotFoundException(`User with ID: ${userId} not found`)
        }

        const category = await prisma.category.findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
                icon: true,
                createdAt: true,
                userId: true
            }
        })

        return {
            success: true,
            data: category
        }
    },

    async getById(userId: string, categoryId: number) {
        const category = await prisma.category.findUnique({
            where: { 
                id: categoryId,
                userId: userId

            },
        })

        if (!category) {
            throw new NotFoundException(`Category with ID: ${categoryId} not found`)
        }

        return {
            success: true,
            data: category
        }
    }
})

export type CategoryService = ReturnType<typeof createCategoryService>;