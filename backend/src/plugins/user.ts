import { Server } from "@hapi/hapi";
import { createUserService } from "../user/service";
import { userRoutes } from "../user/routes";

const userPlugin = {
    name: 'app/users',
    dependencies: ['prisma'],
    register: async function (server: Server) {
        server.app.userService = createUserService(server.app.prisma);
        server.route(userRoutes);
    },
};

export default userPlugin;