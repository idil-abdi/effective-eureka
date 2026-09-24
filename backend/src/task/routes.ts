import { ServerRoute } from "@hapi/hapi";
import { createTaskHandler, deleteTaskByIdHandler, getAllTasksHandler, getTaskByIdHandler } from "./handlers";
import { createTaskSchema } from "./validate";
import Joi from "joi";

export const taskRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/user/{userId}/category/{categoryId}/task',
        handler: createTaskHandler,
        options: {
            validate: {
                payload: createTaskSchema,
            }
        }
    },
    {
        method: 'GET',
        path: '/user/{userId}/category/{categoryId}/task',
        handler: getAllTasksHandler,
    },
    {
        method: 'GET',
        path: '/user/{userId}/category/{categoryId}/task/{taskId}',
        handler: getTaskByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/user/{userId}/category/{categoryId}/task/{taskId}',
        handler: deleteTaskByIdHandler,
    }
]