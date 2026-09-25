import { Frequency } from "../generated/prisma/enums";

export type CreateTaskPayload = {
    name: string;
    description: string;
    frequency: Frequency;
    dueDay?: string;
    categoryId: number;
}

export type UpdateTaskPayload = {
    name?: string;
    description?: string;
    frequency?: Frequency;
    dueDay?: string;
}