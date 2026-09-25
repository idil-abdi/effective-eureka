import { Frequency } from './../generated/prisma/enums';
import { NotFoundException } from "../exception/NotFoundException";
import { PrismaClient } from "../generated/prisma/client";
import { CreateTaskPayload, UpdateTaskPayload } from "./types";

export const createTaskService = (prisma: PrismaClient) => ({
    async create(data: CreateTaskPayload, userId: string, categoryId: number) {
                const category = await prisma.category.findFirst({
                    where: { 
                        id: categoryId,
                        userId: userId, // Ensures the category belongs to this user
                    },
                });
        
                if (!category) {
                    throw new NotFoundException(`Category with ID: ${categoryId} not found`);
                }
        
                const task = await prisma.task.create({
                    data: {
                        name: data.name,
                        description: data.description,
                        frequency: data.frequency,
                        dueDay: data.dueDay,
                        categoryId: categoryId
                    }
                });
        
                return {
                    success: true,
                    data: task
                };
    },

    async getAll(categoryId: number) {
        const task = await prisma.task.findMany({
            where: {
                categoryId: categoryId, // Assumes your database column is named categoryId
            },
        });
        return {
            success: true,
            data: task
        }
    
    },

    async getById(taskId: number, categoryId: number) {
        const task = await prisma.task.findUnique({
            where: { 
                id: taskId,
                categoryId: categoryId
            }
        })

        if (!task) {
            throw new NotFoundException(`Task with ID: ${taskId} not found`)
        }
        return {
            success: true,
            data: task
        }
    },

    async update(data: UpdateTaskPayload, taskId: number, categoryId: number, userId: string) {
        // 1. Verify the category belongs to the user
    const category = await prisma.category.findFirst({
        where: { 
            id: categoryId,
            userId: userId,
        },
    });

    if (!category) {
        throw new NotFoundException(`Category with ID: ${categoryId} not found`);
    }

    // 2. Verify the task exists and belongs to this category
    const existingTask = await prisma.task.findFirst({
        where: {
            id: taskId,
            categoryId: categoryId,
        },
    });

    if (!existingTask) {
        throw new NotFoundException(`Task with ID: ${taskId} not found in category ${categoryId}`);
    }

    // 3. Perform the update
    const task = await prisma.task.update({
        where: {
            id: taskId,
        },
        data: {
            name: data.name,
            description: data.description,
            frequency: data.frequency,
            dueDay: data.dueDay,
        },
    });

    return {
        success: true,
        data: task,
    };
    },

    async delete(taskId: number, categoryId: number) {
        const exitingTask = await prisma.task.findFirst({
            where: { 
                id: taskId,
                categoryId: categoryId
            }
        })

        if (!exitingTask) {
            throw new NotFoundException(`Task with ID: ${taskId} not found`)
        }

        const deletedTask = await prisma.task.delete({
            where: {
                 id: taskId,
                 categoryId: categoryId
            }
        })

        return {
            data: deletedTask
        }
    }
})

export type TaskService = ReturnType<typeof createTaskService>;