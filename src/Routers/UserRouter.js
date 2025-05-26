import { Router } from "express";
import { UserController } from "../Controllers/UserController.js";

export const UserRouter = Router();

UserRouter.post("/create", UserController.createUser);
UserRouter.get("/get-all", UserController.getAllUsers);