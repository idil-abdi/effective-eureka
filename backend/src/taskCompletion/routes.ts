import { ServerRoute } from "@hapi/hapi";
import { markTaskCompletionHandler, getAllTaskCompletionHandler, deleteTaskCompletionHandler } from "./handlers";
import { markTaskCompletionSchema } from "./validate";

export const taskCompletionRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/user/{userId}/task/{taskId}/completions',
        handler: markTaskCompletionHandler,
        options: {
            validate: {
                payload: markTaskCompletionSchema,
            }
        }
    },
    {
        method: 'GET',
        path: '/user/{userId}/task/{taskId}/completions',
        handler: getAllTaskCompletionHandler,
    },
    {
        method: 'DELETE',
        path: '/user/{userId}/task/{taskId}/completions/{completionsId}',
        handler: deleteTaskCompletionHandler,
    },
]