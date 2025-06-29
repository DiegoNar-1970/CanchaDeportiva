import { Router } from "express";
import { ReservaController } from "../Controllers/ReservaController.js";

export const ReservaRouter = Router();

ReservaRouter.post("/create", ReservaController.createReserva);
ReservaRouter.post("/update-reserva", ReservaController.updateReserva);
ReservaRouter.get("/get-all", ReservaController.getAllReservas);
ReservaRouter.get("/usuario/:id_usuario", ReservaController.getReservasByUsuario);
ReservaRouter.put("/:id/cancelar", ReservaController.cancelarReserva);
ReservaRouter.delete("/delete/:id", ReservaController.deleteReserva);
ReservaRouter.get("/:id", ReservaController.getReservaById);