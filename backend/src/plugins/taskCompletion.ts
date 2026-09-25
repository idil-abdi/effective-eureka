import { Server } from "@hapi/hapi";
import { taskCompletionRoutes } from "../taskCompletion/routes";
import { createTaskCompletionService } from "../taskCompletion/service";

const taskCompletionPlugin = {
    name: 'app/taskCompletions',
    dependencies: ['prisma'],
    register: async function (server: Server) {
        server.app.taskCompletionService = createTaskCompletionService(server.app.prisma);
        server.route(taskCompletionRoutes);
    },
};

export default taskCompletionPlugin;