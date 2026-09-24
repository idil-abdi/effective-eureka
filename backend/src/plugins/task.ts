import { Server } from "@hapi/hapi";
import { createTaskService } from "../task/service";
import { taskRoutes } from "../task/routes";

const taskPlugin = {
    name: 'app/tasks',
    dependencies: ['prisma'],
    register: async function (server: Server) {
        server.app.taskService = createTaskService(server.app.prisma);
        server.route(taskRoutes);
    },
};

export default taskPlugin;