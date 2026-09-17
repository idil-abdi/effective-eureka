import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { CreateUserPayload } from "./types";

export const registerUserHandler = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    const { userService } = request.server.app;

    const data = request.payload as CreateUserPayload;

    const user = await userService.create(data);

    return h.response({
        user,
        message: 'New employee has been successfully created'
    }).code(201);
}