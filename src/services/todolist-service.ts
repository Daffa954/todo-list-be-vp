import { Todo, User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";

import { Validation } from "../validations/validation";

import { TodoValidation} from "../validations/todolist-validation";
import {
  TodoCreateRequest,
  TodoResponse,
  toTodoResponse,
  toTodoResponseList,
} from "../models/todolist-model";
import { UserRequest } from "../types/user-request";

export class TodoService {
  static async create(req: Todo) {
    const todoReq = Validation.validate(TodoValidation.CREATE, req);
    const id = await prismaClient.user.findUnique({
      where: {
        id: todoReq.user_id,
      },
    });
    if (!id) {
      throw new ResponseError(400, "user tidak ada");
    }

    const todolist = await prismaClient.todo.create({
      data: {
        title: todoReq.title,
        description: todoReq.description,
        priority: todoReq.priority,
        due_date: todoReq.due_date,
        status: todoReq.status,
        user_id: todoReq.user_id,
      },
    });
    return todolist;
  }

  static async getAll(user: User): Promise<TodoResponse[]> {
    const todos = await prismaClient.todo.findMany({
      where: {
        user_id: user.id,
      },
    });
    return toTodoResponseList(todos);
  }

  static async getTodo(user: User, todo_id: number): Promise<TodoResponse> {
    const todo = await prismaClient.todo.findUnique({
      where: {
        id: todo_id,
        user_id: user.id,
      },
    });
    if (!todo) {
      throw new ResponseError(400, "todo not found");
    }
    return todo;
  }

  static async updateTodo(user:User,todoId: number, req: TodoCreateRequest):Promise<String> {
    const todoValidation =  Validation.validate(TodoValidation.CREATE, req);
    const todo = await prismaClient.todo.findFirst({
      where: {
        id: todoId,
        user_id: user.id
      }
    })
    if(!todo) {
      throw new ResponseError(400, "todo tidak ada")
    }
    await prismaClient.todo.update({
      where: {
        id: todoId,
        user_id: user.id
      },
      data: {
        title: todoValidation.title,
        description: todoValidation.description,
        priority: todoValidation.priority,
        due_date: todoValidation.due_date,
        status: todoValidation.status,
      }
    })
    return "data updated successfully"
  }
  static async createTodo(user: User, req: TodoCreateRequest) {
    const todoRequest = Validation.validate(TodoValidation.CREATE, req);
    await prismaClient.todo.create({
      data: {
        title: todoRequest.title,
        description: todoRequest.description,
        status: todoRequest.status,
        priority: todoRequest.priority,
        due_date: todoRequest.due_date,
        user_id: user.id,
      },
    });
    return "Data created successfully";
  }
  static async checkTodoIsEmpty(
		user_id: number,
		todo_id: number
	): Promise<Todo> {
		const todo = await prismaClient.todo.findUnique({
			where: {
				id: todo_id,
				user_id: user_id,
			},
		})

		if (!todo) {
			throw new ResponseError(400, "Todo not found!")
		}

		return todo
	}
  static async deleteTodo(user: User, todo_id: number): Promise<String> {
		await this.checkTodoIsEmpty(user.id, todo_id)

		const todoDelete = await prismaClient.todo.delete({
			where: {
				user_id: user.id,
				id: todo_id,
			},
		})

		return "Data has been deleted successfully!"
	}
}
