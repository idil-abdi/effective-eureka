import { ServerRoute } from "@hapi/hapi";
import { createTaskHandler, deleteTaskByIdHandler, updateTaskByIdHandler, getAllTasksHandler, getTaskByIdHandler } from "./handlers";
import { createTaskSchema, updateTaskSchema } from "./validate";

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
        method: 'PUT',
        path: '/user/{userId}/category/{categoryId}/task/{taskId}',
        handler: updateTaskByIdHandler,
        options: {
            validate: {
                payload: updateTaskSchema,
            }
        }
    },
    {
        method: 'DELETE',
        path: '/user/{userId}/category/{categoryId}/task/{taskId}',
        handler: deleteTaskByIdHandler,
    }
]