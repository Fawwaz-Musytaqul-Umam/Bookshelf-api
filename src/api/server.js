const Hapi = require('@hapi/hapi');
const route = require('./routes.js');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(route);

    await server.start();
    console.info('Server running on %s', server.info.uri);
};

init();
