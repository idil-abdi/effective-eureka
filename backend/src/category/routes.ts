import { ServerRoute } from '@hapi/hapi';

export const categoryRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/categories',
        // handler: createCategoryHandler,
    },
];