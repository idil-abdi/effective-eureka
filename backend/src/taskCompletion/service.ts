import { ConflictException } from "../exception/ConflictException";
import { NotFoundException } from "../exception/NotFoundException";
import { PrismaClient } from "../generated/prisma/client";
import { CreateTaskCompletionPayload } from "./types";

export const createTaskCompletionService = (prisma: PrismaClient) => ({
    async markTaskCompletion(data: CreateTaskCompletionPayload, userId: string, taskId: number) {
        // 1. Verify that the task exists and belongs to the user
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                category: {
                    userId: userId,
                },
            },
        });

        if (!task) {
        throw new NotFoundException(`Task with ID: ${taskId} not found`);
        }

        // 2. Check if a completion record already exists for this specific date
        const existingCompletion = await prisma.taskCompletion.findUnique({
        where: {
            taskId_date: {
                taskId: taskId,
                date: data.date,
            },
        },
        });

        // 3. If it exists and is already marked, throw a ConflictException
        if (existingCompletion && existingCompletion.completed) {
            throw new ConflictException('Task already marked as complete for this date');
        }

        // 4. Otherwise, create or update the completion record
        const taskCompletion = await prisma.taskCompletion.upsert({
            where: {
                taskId_date: {
                    taskId: taskId,
                    date: data.date,
                },
            },
            update: {
                completed: data.completed,
            },
            create: {
                taskId: taskId,
                date: data.date,
                completed: data.completed,
            },
        });

        return {
            success: true,
            data: taskCompletion,
        };
    },

    async getAll(userId: string, taskId:number) {
        // 1. Verify that the task exists and belongs to the user
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            category: {
                userId: userId,
            },
        },
    });

    if (!task) {
        throw new NotFoundException(`Task with ID: ${taskId} not found`);
    }

    // 2. Fetch all completion records for this task
    const completions = await prisma.taskCompletion.findMany({
        where: {
            taskId: taskId,
        },
        orderBy: {
            date: 'desc', // Optional: sorts completions from newest to oldest
        },
    });

    return {
        success: true,
        data: completions,
    };
    },

    async delete(userId: string, taskId:number, completionId: number) {
       // 1. Verify that the task exists and belongs to the user
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                category: {
                    userId: userId,
                },
            },
        });

        if (!task) {
            throw new NotFoundException(`Task with ID: ${taskId} not found`);
        }


        // 3. Delete the completion record
        await prisma.taskCompletion.delete({
            where: {
                id: completionId,
            },
        });

        return {
            success: true,
            message: 'Task completion deleted successfully',
        };
    }
})

export type TaskCompletionService = ReturnType<typeof createTaskCompletionService>;
