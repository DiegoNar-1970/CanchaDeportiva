import { Router } from "express";
import { CanchaController } from "../Controllers/CanchaController.js";

export const CanchaRouter = Router();

CanchaRouter.post("/", CanchaController.createCancha);
CanchaRouter.get("/get-all", CanchaController.getAllCanchas);
CanchaRouter.get("/:id", CanchaController.getCanchaById);
CanchaRouter.put("/:id", CanchaController.updateCancha);
CanchaRouter.delete("/:id", CanchaController.deleteCancha);
CanchaRouter.get("/disponibles", CanchaController.getAvailableCanchas);