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
    request: Request, 
    h: ResponseToolkit
):Promise<ResponseObject> => {
    const { categoryService } = request.server.app;
    const categories = await categoryService.getAll();
    return h.response(categories).code(200);
}

export const getCategoryByIdHandler = async(
    request: Request,
    h: ResponseToolkit
):Promise<ResponseObject> => {
    const { categoryId } = request.params;
    const { categoryService } = request.server.app;
    const getCategoriesById = await categoryService.getById(Number(categoryId));
    return h.response(getCategoriesById).code(200);
}

export const updateCategoryHandler = async(
    request: Request,
    h: ResponseToolkit
):Promise<ResponseObject> => {
    const { userId, categoryId } = request.params;
    const { categoryService } = request.server.app;

    const data = request.payload as CreateCategoryPayload

    const update = await categoryService.update(String(userId), Number(categoryId), data);
    
    return h.response({
        id: update.data.id,
        message: 'category has been successfully deleted'
    }).code(200);
}

export const deleteCategoryHandler = async(
    request: Request,
    h: ResponseToolkit
):Promise<ResponseObject> => {
    const { userId, categoryId } = request.params;
    const { categoryService } = request.server.app;

    const deleted = await categoryService.delete(String(userId), Number(categoryId));
    
    return h.response({
        id: deleted.data.id,
        message: 'Category has been successfully deleted'
    }).code(200);
}