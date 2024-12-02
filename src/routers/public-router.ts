import express from "express"
import { UserController } from "../controllers/user-controller"
import { TodoController } from "../controllers/todolist-controller"

export const publicRouter = express.Router()
publicRouter.post("/api/register", UserController.register)
publicRouter.get("/api/", UserController.getAllUsers)
publicRouter.post("/api/login", UserController.login)
publicRouter.post("/api/create", TodoController.createTodo)
publicRouter.get("/api/see", TodoController.seeTodo)
