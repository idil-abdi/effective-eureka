import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { CreateTaskPayload } from "./types";

type TaskParams = {
    userId: string;
    categoryId: string;
}

export const createTaskHandler = async(
    request: Request<{ Params: TaskParams}>,
    h: ResponseToolkit
): Promise<ResponseObject> => {
    const { userId } = request.params;
    const categoryId = parseInt(request.params.categoryId, 10);
    const { taskService } = request.server.app;

    const data = request.payload as CreateTaskPayload;

    const task = await taskService.create( data, userId, categoryId )

    return h.response(task).code(201)
    
}

export const getAllTasksHandler = async(
    request: Request, 
    h: ResponseToolkit
):Promise<ResponseObject> => {
    const { taskService } = request.server.app;
    const task = await taskService.getAll();
    return h.response(task).code(200);
}

export const getTaskByIdHandler = async(
    request: Request, 
    h: ResponseToolkit
):Promise<ResponseObject> => {
    const { taskId } = request.params;
    const { taskService } = request.server.app;
    const task = await taskService.getById(Number(taskId));
    return h.response(task).code(200);
}

export const deleteTaskByIdHandler = async(
    request: Request,
    h: ResponseToolkit
):Promise<ResponseObject> => {
    const { taskId, categoryId } = request.params;
    const { taskService } = request.server.app;

    const deleted = await taskService.delete(Number(taskId), Number(categoryId));
    
    return h.response({
        id: deleted.data.id,
        message: 'task has been successfully deleted'
    }).code(200);
}