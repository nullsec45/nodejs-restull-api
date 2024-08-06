import express from "express";
import userController from "../controllers/user-controller.js";

const userRouter = new express.Router();
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

export { userRouter };
