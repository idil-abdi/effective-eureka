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

    async getAll() {
        return prisma.category.findMany({
            include: {
                tasks: true,
            }
        })
    },

    async getById(categoryId: number) {
        const category = await prisma.category.findUnique({
            where: { 
                id: categoryId,
            },
            include: {
                tasks: true,
            }
        })

        if (!category) {
            throw new NotFoundException(`Category with ID: ${categoryId} not found`)
        }

        return {
            success: true,
            data: category
        }
    },

    async update(userId: string, categoryId: number, data: CreateCategoryPayload ) {
        const cleanedName = data.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const exitingCategory = await prisma.category.findFirst({
            where: { 
                id: categoryId,
                userId: userId

            },
        })

        if (!exitingCategory) {
            throw new NotFoundException(`Category with ID: ${categoryId} not found`)
        }

        const updatedCategory = await prisma.category.update({
            where: {
                id: categoryId,
            },
            data: {
                name: cleanedName,
                icon: data.icon,
            }
        })

        return {
            success: true,
            data: updatedCategory
        }
    },

    async delete(userId: string, categoryId: number) {
        const exitingCategory = await prisma.category.findFirst({
            where: { 
                id: categoryId,
                userId: userId

            },
        })

        if (!exitingCategory) {
            throw new NotFoundException(`Category with ID: ${categoryId} not found`)
        }

        const deletedCategory = await prisma.category.delete({
            where: {
                id: categoryId,
                userId: userId
            }
        })

        return {
            data: deletedCategory
        }
    }
})

export type CategoryService = ReturnType<typeof createCategoryService>;