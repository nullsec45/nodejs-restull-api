import express from "express";
import userController from "../controllers/user-controller.js";
import categoryController from "../controllers/category-controller.js";

const publicRouter = new express.Router();
publicRouter.get("/api/categories", categoryController.get);
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);

export { publicRouter };
