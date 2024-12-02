"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const todolist_controller_1 = require("../controllers/todolist-controller");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.post("/api/register", user_controller_1.UserController.register);
exports.publicRouter.get("/api/", user_controller_1.UserController.getAllUsers);
exports.publicRouter.post("/api/login", user_controller_1.UserController.login);
exports.publicRouter.post("/api/create", todolist_controller_1.TodoController.createTodo);
exports.publicRouter.get("/api/see", todolist_controller_1.TodoController.seeTodo);
