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
exports.TodoController = void 0;
const todolist_service_1 = require("../services/todolist-service");
class TodoController {
    static createTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield todolist_service_1.TodoService.create(request);
                res.status(200).json({ data: response });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static seeTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield todolist_service_1.TodoService.seeAll();
                res.status(200).json(response);
            }
            catch (error) {
                //ini pass error ke middleware
                next(error);
            }
        });
    }
}
exports.TodoController = TodoController;
