import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { CreateTaskCompletionPayload } from "./types";

type TaskCompletionParams = {
    userId: string;
    taskId: string;
    completionsId: string;
};

export const markTaskCompletionHandler = async(
    request: Request<{Params: TaskCompletionParams}>,
    h: ResponseToolkit
): Promise<ResponseObject> => {
    const { userId } = request.params;
    const taskId = parseInt(request.params.taskId, 10);
    const { taskCompletionService } = request.server.app;

    const data = request.payload as CreateTaskCompletionPayload;

    const taskCompletion = await taskCompletionService.markTaskCompletion( data, userId, taskId )

    return h.response(taskCompletion).code(201)
}

export const getAllTaskCompletionHandler = async(
    request: Request<{ Params: TaskCompletionParams}>,
    h: ResponseToolkit
): Promise<ResponseObject> => {
    const { userId } = request.params;
    const taskId = parseInt(request.params.taskId, 10);

    const { taskCompletionService } = request.server.app;
    const taskCompletion = await taskCompletionService.getAll(userId, taskId);
    return h.response(taskCompletion).code(200)
}

export const deleteTaskCompletionHandler = async(
    request: Request<{ Params: TaskCompletionParams}>,
    h: ResponseToolkit
): Promise<ResponseObject> => {
    const { userId } = request.params;
    const taskId = parseInt(request.params.taskId, 10);
    const completionsId = parseInt(request.params.completionsId, 10);

    const { taskCompletionService } = request.server.app;
    const deleted = await taskCompletionService.delete(userId, taskId, completionsId);
    return h.response(deleted).code(200)
}