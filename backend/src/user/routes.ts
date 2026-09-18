import { ServerRoute } from '@hapi/hapi';
import { getAllUsersHandler, getUserByIdHandler, registerUserHandler } from './handlers';
import { createUserSchema } from './validate';

export const userRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/auth/register',
        handler: registerUserHandler,
        options: {
            validate: {
                payload: createUserSchema,
            }
        },
    },
    {
        method: 'GET',
        path: '/user',
        handler: getAllUsersHandler,
    },
    {
        method: 'GET',
        path: '/user/{userId}',
        handler: getUserByIdHandler,
    }
];