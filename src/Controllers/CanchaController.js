import { CanchaService } from "../Services/CanchaService.js";

export class CanchaController {
    static async createCancha(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: "Bad request: No data provided" });
            }
            const canchaData = req.body;
            const canchaId = await CanchaService.createCancha(canchaData);
            res.status(201).json({ message: "Cancha created successfully", canchaId });
        } catch (error) {
            console.error("Error creating cancha in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async getAllCanchas(req, res) {
        try {
            const canchas = await CanchaService.getAllCanchas();
            res.status(200).json(canchas);
        } catch (error) {
            console.error("Error fetching canchas in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async getCanchaById(req, res) {
        try {
            const { id } = req.params;
            const cancha = await CanchaService.getCanchaById(id);
            if (!cancha) {
                return res.status(404).json({ message: "Cancha not found" });
            }
            res.status(200).json(cancha);
        } catch (error) {
            console.error("Error fetching cancha by ID in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async updateCancha(req, res) {
        try {
            const { id } = req.params;
            const canchaData = req.body;
            const updatedCancha = await CanchaService.updateCancha(id, canchaData);
            res.status(200).json({ message: "Cancha updated successfully", cancha: updatedCancha });
        } catch (error) {
            console.error("Error updating cancha in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async deleteCancha(req, res) {
        try {
            const { id } = req.params;
            await CanchaService.deleteCancha(id);
            res.status(200).json({ message: "Cancha deleted successfully" });
        } catch (error) {
            console.error("Error deleting cancha in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async getAvailableCanchas(req, res) {
        try {
            const { fecha, hora_inicio, hora_fin } = req.query;
            
            if (!fecha || !hora_inicio || !hora_fin) {
                return res.status(400).json({ message: "Fecha, hora_inicio and hora_fin are required" });
            }

            const availableCanchas = await CanchaService.getAvailableCanchas(fecha, hora_inicio, hora_fin);
            res.status(200).json(availableCanchas);
        } catch (error) {
            console.error("Error fetching available canchas in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}