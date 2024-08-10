import express from "express";
import userController from "../controllers/user-controller.js";
import contactController from "../controllers/contact-controller.js";

const userRouter = new express.Router();
// userAPI
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// contactAPI
userRouter.post("/api/contacts", contactController.create);
userRouter.get("/api/contacts/:contactId", contactController.get);
userRouter.put("/api/contacts/:contactId", contactController.update);
userRouter.delete("/api/contacts/:contactId", contactController.remove);

export { userRouter };
