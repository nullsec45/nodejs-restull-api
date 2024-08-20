import express from "express";
import userController from "../controllers/user-controller.js";
import contactController from "../controllers/contact-controller.js";
import addressController from "../controllers/address-controller.js";

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
userRouter.get("/api/contacts", contactController.search);

// Address API
userRouter.post('/api/contacts/:contactId/addresses', addressController.create);
userRouter.get('/api/contacts/:contactId/addresses/:addressId', addressController.get);
userRouter.put("/api/contacts/:contactId/addresses/:addressId", addressController.update);
userRouter.delete("/api/contacts/:contactId/addresses/:addressId", addressController.remove);
userRouter.get("/api/contacts/:contactId/addresses", addressController.list);

export { userRouter };
