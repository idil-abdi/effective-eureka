import { ServerRoute } from '@hapi/hapi';
import { createCategoryHandler, getAllCategoriesHandler, getCategoryByIdHandler } from './handlers';
import { createCategorySchema } from './validate';

export const categoryRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/user/{userId}/category',
        handler: createCategoryHandler,
        options: {
            validate: {
                payload: createCategorySchema,
            }
        }
    },
    {
        method: 'GET',
        path: '/user/{userId}/category',
        handler: getAllCategoriesHandler,
    },
    {
        method: 'GET',
        path: '/user/{userId}/category/{categoryId}',
        handler: getCategoryByIdHandler,
    },
    // {
    //     method: 'PUT',
    //     path: '/user/{userId}/category/{categoryId}',
    //     // handler: updateCategoryHandler,
    // },
    // {
    //     method: 'DELETE',
    //     path: '/user/{userId}/category/{categoryId}',
    //     // handler: deleteCategoryHandler,
    // },
];