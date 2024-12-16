import { NextFunction, Request, Response } from "express";
import { TodoCreateRequest } from "../models/todolist-model";
import { TodoService } from "../services/todolist-service";
import { UserRequest } from "../types/user-request";

export class TodoController {
  static async createTodo(req: UserRequest, res: Response, next: NextFunction) {
    //mengapa pakai userRequest karena membutuhkan data dari user
    try {
      const request: TodoCreateRequest = req.body as TodoCreateRequest;

      const response = await TodoService.createTodo(req.user!, request);
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
  static async getAllTodos(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await TodoService.getAll(req.user!);
      res.status(200).json(response);
    } catch (error) {
      //ini pass error ke middleware
      next(error);
    }
  }
  static async getTodo(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await TodoService.getTodo(
        req.user!,
        Number(req.params.todoId)
      );
      //buat ambil parameter todoId di url
      res.status(200).json(response);
    } catch (error) {
      //ini pass error ke middleware
      next(error);
    }
  }
  static async updateTodo(req: UserRequest, res: Response, next: NextFunction) {
    //mengapa pakai userRequest karena membutuhkan data dari user
    try {
      const request: TodoCreateRequest = req.body as TodoCreateRequest;

      const response = await TodoService.updateTodo(
        req.user!,
        Number(req.params.todoId),
        request
      );
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
  static async deleteTodo(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await TodoService.deleteTodo(
        req.user!,
        Number(req.params.todoId)
      );

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
