import { z, ZodType } from "zod";

export class TodoListValidation {
    static readonly CREATE: ZodType = z.object({
        title :  z.string().min(1).max(150),
        description :  z.string().min(1),
        priority: z.string().min(1).max(100),
        due_date:  z.string().min(1).max(150),
        status :z.string().min(1).max(150),
        user_id: z.number()
    })

   

}