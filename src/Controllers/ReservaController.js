import { ReservaService } from "../Services/ReservaService.js";

export class ReservaController {
    static async createReserva(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: "Bad request: No data provided" });
            }
            
            const reservaData = req.body;
            const reservaId = await ReservaService.createReserva(reservaData);
            
            res.status(201).json({ 
                message: "Reserva creada exitosamente", 
                reservaId 
            });
        } catch (error) {
            console.error("Error creating reserva in controller:", error);
            if (error.message.includes("no está disponible")) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async getReservaById(req, res) {
        try {
            const { id } = req.params;
            const reserva = await ReservaService.getReservaById(id);
            
            if (!reserva) {
                return res.status(404).json({ message: "Reserva no encontrada" });
            }
            
            res.status(200).json(reserva);
        } catch (error) {
            console.error("Error fetching reserva by ID in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async getReservasByUsuario(req, res) {
        try {
            const { id_usuario } = req.params;
            const reservas = await ReservaService.getReservasByUsuario(id_usuario);
            
            res.status(200).json(reservas);
        } catch (error) {
            console.error("Error fetching reservas by usuario in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async cancelarReserva(req, res) {
        try {
            const { id } = req.params;
            const reservaActualizada = await ReservaService.cancelarReserva(id);
            
            res.status(200).json({ 
                message: "Reserva cancelada exitosamente", 
                reserva: reservaActualizada 
            });
        } catch (error) {
            console.error("Error canceling reserva in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async getReservasByCanchaAndDate(req, res) {
        try {
            const { id_cancha, fecha } = req.params;
            const reservas = await ReservaService.getReservasByCanchaAndDate(id_cancha, fecha);
            
            res.status(200).json(reservas);
        } catch (error) {
            console.error("Error fetching reservas by cancha and date in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    static async deleteReserva(req, res) {
        try {
            const { id } = req.params;
            await ReservaService.deleteReserva(id);
            
            res.status(200).json({ message: "Reserva eliminada exitosamente" });
        } catch (error) {
            console.error("Error deleting reserva in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}