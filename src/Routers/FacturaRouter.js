import { Router } from "express";
import { FacturaController } from "../Controllers/FacturaController.js";

export const FacturaRouter = Router();

FacturaRouter.post("/", FacturaController.createFactura);
FacturaRouter.get("/:id", FacturaController.getFacturaById);
FacturaRouter.get("/usuario/:id_usuario", FacturaController.getFacturasByUsuario);
FacturaRouter.get("/reporte/rango-fechas", FacturaController.getFacturasByDateRange);
FacturaRouter.delete("/:id", FacturaController.deleteFactura);