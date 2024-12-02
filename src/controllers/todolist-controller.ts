import { NextFunction, Request, Response } from "express";
import { LoginUserRequest, RegisterUserRequest, UserResponse } from "../models/user-model";
import { UserService } from "../services/auth-service";
import { Todo } from "../models/todolist-model";
import { TodoService } from "../services/todolist-service";

export class TodoController {
    static async createTodo(req: Request, res: Response, next: NextFunction){
        try {
            const request: Todo = req.body as Todo
            const response = await TodoService.create(request)
            res.status(200).json({data:response})
        } catch (error) {
            next(error)
        }
    }
    static async seeTodo(req: Request, res: Response, next: NextFunction){
        try {
           
            const response = await TodoService.seeAll()
            res.status(200).json(response)
        } catch (error) {
            //ini pass error ke middleware
            next(error)
        }
    }
}