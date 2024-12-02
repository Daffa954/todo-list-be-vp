"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../errors/response-error");
const validation_1 = require("../validations/validation");
const todolist_validation_1 = require("../validations/todolist-validation");
class TodoService {
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const todoReq = validation_1.Validation.validate(todolist_validation_1.TodoListValidation.CREATE, req);
            const id = yield database_1.prismaClient.user.findUnique({
                where: {
                    id: todoReq.user_id
                },
            });
            if (!id) {
                throw new response_error_1.ResponseError(400, "user tidak ada");
            }
            const todolist = yield database_1.prismaClient.todo.create({
                data: {
                    title: todoReq.title,
                    description: todoReq.description,
                    priority: todoReq.priority,
                    due_date: todoReq.due_date,
                    status: todoReq.status,
                    user_id: todoReq.user_id
                },
            });
            return todolist;
        });
    }
    static seeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield database_1.prismaClient.todo.findMany();
            return todos;
        });
    }
}
exports.TodoService = TodoService;
