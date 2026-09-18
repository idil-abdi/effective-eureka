import { Server } from "@hapi/hapi";
import { categoryRoutes } from "../category/routes";
import { createCategoryService } from "../category/service";

const categoryPlugin = {
    name: 'app/categories',
    dependencies: ['prisma'],
    register: async function (server: Server) {
        server.app.categoryService = createCategoryService(server.app.prisma);
        server.route(categoryRoutes);
    },
};

export default categoryPlugin;