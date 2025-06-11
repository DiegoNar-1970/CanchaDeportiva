import { Router } from "express";
import { ReservaController } from "../Controllers/ReservaController.js";

export const ReservaRouter = Router();

ReservaRouter.post("/", ReservaController.createReserva);
ReservaRouter.get("/:id", ReservaController.getReservaById);
ReservaRouter.get("/usuario/:id_usuario", ReservaController.getReservasByUsuario);
ReservaRouter.put("/:id/cancelar", ReservaController.cancelarReserva);
ReservaRouter.get("/cancha/:id_cancha/fecha/:fecha", ReservaController.getReservasByCanchaAndDate);
ReservaRouter.delete("/:id", ReservaController.deleteReserva);