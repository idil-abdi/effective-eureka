import { ServerRoute } from '@hapi/hapi';
import { registerUserHandler } from './handlers';
import { createUserSchema } from './validate';

export const userRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/auth/register',
        handler: registerUserHandler,
        options: {
            validate: {
                payload: createUserSchema,
                failAction: async (request, h, err) => {
                // Optional: custom error formatting for validation failures
                throw err;
            }
            }
        }
    },
];