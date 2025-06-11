import { HorarioDisponibleService } from "../Services/HorarioDisponibleService.js";

export class HorarioDisponibleController {
    static async createHorario(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: "Bad request: No data provided" });
            }
            const horarioData = req.body;
            const horarioId = await HorarioDisponibleService.createHorario(horarioData);
            res.status(201).json({ message: "Horario created successfully", horarioId });
        } catch (error) {
            console.error("Error creating horario in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async getHorariosByCancha(req, res) {
        try {
            const { id_cancha } = req.params;
            const horarios = await HorarioDisponibleService.getHorariosByCancha(id_cancha);
            res.status(200).json(horarios);
        } catch (error) {
            console.error("Error fetching horarios by cancha in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async deleteHorario(req, res) {
        try {
            const { id } = req.params;
            await HorarioDisponibleService.deleteHorario(id);
            res.status(200).json({ message: "Horario deleted successfully" });
        } catch (error) {
            console.error("Error deleting horario in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}