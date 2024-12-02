"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListValidation = void 0;
const zod_1 = require("zod");
class TodoListValidation {
}
exports.TodoListValidation = TodoListValidation;
TodoListValidation.CREATE = zod_1.z.object({
    title: zod_1.z.string().min(1).max(150),
    description: zod_1.z.string().min(1),
    priority: zod_1.z.string().min(1).max(100),
    due_date: zod_1.z.string().min(1).max(150),
    status: zod_1.z.string().min(1).max(150),
    user_id: zod_1.z.number()
});
