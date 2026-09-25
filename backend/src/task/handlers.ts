import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { CreateTaskPayload, UpdateTaskPayload } from "./types";

type TaskParams = {
    userId: string;
    categoryId: string;
    taskId: string;
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
    request: Request<{ Params: TaskParams}>,
    h: ResponseToolkit
):Promise<ResponseObject> => {
    const categoryId = parseInt(request.params.categoryId, 10);
    const { taskService } = request.server.app;
    const task = await taskService.getAll(categoryId);
    return h.response(task).code(200);
}

export const getTaskByIdHandler = async(
    request: Request<{ Params: TaskParams}>, 
    h: ResponseToolkit
):Promise<ResponseObject> => {
    const taskId = parseInt(request.params.taskId, 10);
    const categoryId = parseInt(request.params.categoryId, 10);
    const { taskService } = request.server.app;
    const task = await taskService.getById(taskId, categoryId);
    return h.response(task).code(200);
}

export const updateTaskByIdHandler = async(
    request: Request, 
    h: ResponseToolkit
):Promise<ResponseObject> => {
    const { userId, taskId, categoryId } = request.params;
    const { taskService } = request.server.app;

    const data = request.payload as UpdateTaskPayload;

    const updatedTask = await taskService.update(data, Number(taskId), Number(categoryId), String(userId));

    return h.response({
        data: updatedTask.data,
        message: 'Task has been successfully updated'
    }).code(200);
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
        message: 'Task has been successfully deleted'
    }).code(200);
}