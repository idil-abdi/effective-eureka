import Hapi from '@hapi/hapi';
import prismaPlugin from './plugins/prisma';
import userPlugin from './plugins/user';
import errorHandlerPlugin from './exception/errorHandlerPlugin ';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.register([prismaPlugin,errorHandlerPlugin, userPlugin]);
    await server.start();

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();