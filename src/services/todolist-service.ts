import { Todo } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";

import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";

import { TodoListValidation } from "../validations/todolist-validation";

export class TodoService {
  static async create(req: Todo) {
    const todoReq = Validation.validate(TodoListValidation.CREATE, req)
    const id = await prismaClient.user.findUnique({
      where: {
        id: todoReq.user_id
      },
    });
    if (!id) {
      throw new ResponseError(400, "user tidak ada");
    }

    const todolist = await prismaClient.todo.create({
      data: {
        title: todoReq.title,
        description : todoReq.description,
        priority: todoReq.priority,
        due_date: todoReq.due_date,
        status: todoReq.status,
        user_id: todoReq.user_id
      },
    });
    return todolist
  }

  static async seeAll() {
    const todos = await prismaClient.todo.findMany();
    return todos;
  }

  
}
