import { FacturaService } from "../Services/FacturaService.js";

export class FacturaController {
    static async createFactura(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: "Bad request: No data provided" });
            }
            
            const facturaData = req.body;
            const facturaId = await FacturaService.createFactura(facturaData);
            
            res.status(201).json({ 
                message: "Factura creada exitosamente", 
                facturaId 
            });
        } catch (error) {
            console.error("Error creating factura in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async getFacturaById(req, res) {
        try {
            const { id } = req.params;
            const factura = await FacturaService.getFacturaById(id);
            
            if (!factura) {
                return res.status(404).json({ message: "Factura no encontrada" });
            }
            
            res.status(200).json(factura);
        } catch (error) {
            console.error("Error fetching factura by ID in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async getFacturasByUsuario(req, res) {
        try {
            const { id_usuario } = req.params;
            const facturas = await FacturaService.getFacturasByUsuario(id_usuario);
            
            res.status(200).json(facturas);
        } catch (error) {
            console.error("Error fetching facturas by usuario in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async getFacturasByDateRange(req, res) {
        try {
            const { fecha_inicio, fecha_fin } = req.query;
            
            if (!fecha_inicio || !fecha_fin) {
                return res.status(400).json({ message: "fecha_inicio and fecha_fin are required" });
            }
            
            const facturas = await FacturaService.getFacturasByDateRange(fecha_inicio, fecha_fin);
            
            res.status(200).json(facturas);
        } catch (error) {
            console.error("Error fetching facturas by date range in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async deleteFactura(req, res) {
        try {
            const { id } = req.params;
            await FacturaService.deleteFactura(id);
            
            res.status(200).json({ message: "Factura eliminada exitosamente" });
        } catch (error) {
            console.error("Error deleting factura in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}