import { Frequency } from './../generated/prisma/enums';
import { NotFoundException } from "../exception/NotFoundException";
import { PrismaClient } from "../generated/prisma/client";
import { CreateTaskPayload } from "./types";

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

    async getAll() {
        return prisma.task.findMany()
    },

    async getById(taskId: number) {
        const task = await prisma.task.findUnique({
            where: { 
                id: taskId,
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