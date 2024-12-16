import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { UserController } from "../controllers/user-controller"
import { TodoController } from "../controllers/todolist-controller"

export const protectedRouter = express.Router()
protectedRouter.use(authMiddleware)

protectedRouter.post("/api/todo", TodoController.createTodo)
protectedRouter.delete("/api/logout", UserController.logout)
protectedRouter.get("/api/todo", TodoController.getAllTodos)
protectedRouter.get("/api/todo/:todoId", TodoController.getTodo)
protectedRouter.put("/api/todo:todoId", TodoController.updateTodo)
protectedRouter.delete("/api/todo-list/:todoId(\\d+)", TodoController.deleteTodo)