import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { CreateCategoryPayload } from "./types";

type CategoryParams = {
    userId: string;
}

export const createCategoryHandler = async(
    request: Request<{ Params: CategoryParams }>,
    h: ResponseToolkit
):Promise<ResponseObject> => {
    const { userId } = request.params;
    const { categoryService } = request.server.app;

    const data = request.payload as CreateCategoryPayload;

    const category = await categoryService.create(
        { ...data, userId },
        userId
    );

    return h.response(category).code(201);
}

export const getAllCategoriesHandler = async(
    request: Request<{ Params: CategoryParams }>,
    h: ResponseToolkit
):Promise<ResponseObject> => {
    const { userId } = request.params;
    const { categoryService } = request.server.app;
    const categories = await categoryService.getAll(String(userId));
    return h.response(categories).code(200);
}

export const getCategoryByIdHandler = async(
    request: Request,
    h: ResponseToolkit
):Promise<ResponseObject> => {
    const { userId, categoryId } = request.params;
    const { categoryService } = request.server.app;
    const getCategoriesById = await categoryService.getById(String(userId), Number(categoryId));
    return h.response(getCategoriesById).code(200);
}