import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { CreateUserPayload } from "./types";

export const registerUserHandler = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    const { userService } = request.server.app;

    const data = request.payload as CreateUserPayload;

    const user = await userService.create(data);

    return h.response({
        user,
        message: 'New user has been successfully created'
    }).code(201);
}

export const getAllUsersHandler = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    const { userService } = request.server.app;
    const users = await userService.getAll();
    return h.response(users).code(200);
}

export const getUserByIdHandler = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    const { userId } = request.params;
    const { userService } = request.server.app;

    const user = await userService.getById(String(userId));

    return h.response(user).code(200);
}