import { isBoom } from "@hapi/boom";
import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import { ValidationException } from "../exception/ValidationException";
import { NotFoundException } from "../exception/NotFoundException";
import { ConflictException } from "../exception/ConflictException";

export const errorHandlerPlugin = {
    name: 'error-handler',
    register: async function (server: Server) {
        server.ext({
            type: 'onPreResponse',
            method: async (request: Request, h: ResponseToolkit) => {
                const response = request.response;

                if (!isBoom(response)) {
                    return h.continue;
                }

                if (response instanceof ConflictException) {
                    return h
                        .response({
                            statusCode: 409,
                            error: 'Conflict',
                            message: response.message,
                        })
                        .code(409);
                }

                if (response instanceof NotFoundException) {
                    return h
                        .response({
                            statusCode: 404,
                            error: 'Not Found',
                            message: response.message,
                        })
                        .code(404);
                }

                if (response instanceof ValidationException) {
                    return h
                        .response({
                            statusCode: 400,
                            error: 'Bad Request',
                            message: response.message,
                        })
                        .code(400);
                }

                return h
                    .response({
                        statusCode: response.output.statusCode,
                        error: response.output.payload.error,
                        message: response.output.payload.message,
                    })
                    .code(response.output.statusCode);
            },
        });
    },
};

export default errorHandlerPlugin;