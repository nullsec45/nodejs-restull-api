import express from "express";
import { publicRouter } from "../routes/public-api.js";
import { errorMiddleware } from "../middlewares/error-middleware.js";
import { userRouter } from "../routes/api.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

export const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(authMiddleware);

web.use(userRouter);

web.use(errorMiddleware);
