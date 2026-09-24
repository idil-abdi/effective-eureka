import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { Server } from '@hapi/hapi';
import { UserService } from '../user/service';
import { CategoryService } from '../category/service';
import { TaskService } from '../task/service'

declare module '@hapi/hapi' {
    interface ServerApplicationState {
        prisma: PrismaClient;
        userService: UserService;
        categoryService: CategoryService;
        taskService: TaskService
    }
}


const prismaPlugin = {
    name: 'prisma',
    register: async function (server: Server) {
        const prisma = new PrismaClient({
            adapter: new PrismaPg({
                connectionString: process.env.DATABASE_URL,
            }),
        });

        server.app.prisma = prisma;

        server.ext({
            type: 'onPostStop',
            method: async (server) => {
                server.app.prisma.$disconnect();
            },
        });
    },
};

export default prismaPlugin;