import { ReservaService } from "../Services/ReservaService.js";

export class ReservaController {
    static async createReserva(req, res) {
        
        try {
            const reservaData = req.body;
            console.log(req.body)
            const reservaId = await ReservaService.createReserva(reservaData);
            if (reservaId.error) {
                return res.status(400).json({ error: reservaId.error });
            }
            return res.status(200).json({ 
                message: "Reserva creada exitosamente", 
                reservaId: reservaId.id_reserva
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
            console.log(id_usuario)
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
        const { id } = req.params;
        try {
            const reponse = await ReservaService.deleteReserva(id);

            return res.status(200).json({ message: "Reserva eliminada exitosamente",reponse });
        } catch (error) {
            console.error("Error deleting reserva in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
    static async getAllReservas(req, res) {
        try {
            const reservas = await ReservaService.getAllReservas();
            res.status(200).json(reservas);
        } catch (error) {
            console.error("Error fetching all reservas in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
    static async updateReserva(req, res) {
        try {
            const data = req.body
            const reservas = await ReservaService.updateReserva(data);
            res.status(200).json({reservas,message:'Reserva Actualizada'});
        } catch (error) {
            console.error("Error fetching all reservas in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}