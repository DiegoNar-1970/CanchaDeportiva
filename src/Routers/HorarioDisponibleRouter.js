import { Router } from "express";
import { HorarioDisponibleController } from "../Controllers/HorarioDisponibleController.js";

export const HorarioDisponibleRouter = Router();

HorarioDisponibleRouter.post("/", HorarioDisponibleController.createHorario);
HorarioDisponibleRouter.get("/cancha/:id_cancha", HorarioDisponibleController.getHorariosByCancha);
HorarioDisponibleRouter.delete("/:id", HorarioDisponibleController.deleteHorario);