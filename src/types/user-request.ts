import { User } from "@prisma/client";
import { Request } from "express";
//tipe data baru
export interface UserRequest extends Request {
    user? : User
}