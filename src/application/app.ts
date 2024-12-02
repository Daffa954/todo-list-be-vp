import express from "express"
import { publicRouter } from "../routers/public-router"
import { errorMiddleware } from "../middlewares/error-middleware"
import cors from 'cors';
import { protectedRouter } from "../routers/protected-router";

const app = express()
app.use(express.json())
app.use(publicRouter)
app.use(protectedRouter)
app.use(errorMiddleware)
app.use(cors());

export default app
