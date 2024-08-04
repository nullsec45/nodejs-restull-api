import express from "express";
import userController from "../controllers/user-controller.js";

const userRouter = new express.Router();
userRouter.get("/api/users/current", userController.get);

export { userRouter };
