import { ReservaModel } from '../Models/ReservaModel.js';

export class ReservaService {
    static async createReserva(reservaData) {
        try {
            // Validar que la cancha esté disponible en el horario solicitado
            const reservasExistentes = await ReservaModel.getReservasByCanchaAndDate(
                reservaData.id_cancha, 
                reservaData.fecha_reserva
            );

            const solapamiento = reservasExistentes.some(reserva => {
                return (
                    (reserva.hora_inicio < reservaData.hora_fin && 
                     reserva.hora_fin > reservaData.hora_inicio) &&
                    reserva.estado !== 'cancelada'
                );
            });

            if (solapamiento) {
                throw new Error("La cancha no está disponible en el horario solicitado");
            }

            const reservaId = await ReservaModel.createReserva(reservaData);
            return reservaId;
        } catch (error) {
            console.error("Error creating reserva in service:", error);
            throw error;
        }
    }

    static async getReservaById(id_reserva) {
        try {
            const reserva = await ReservaModel.getReservaById(id_reserva);
            return reserva;
        } catch (error) {
            console.error("Error fetching reserva by ID in service:", error);
            throw error;
        }
    }

    static async getReservasByUsuario(id_usuario) {
        try {
            const reservas = await ReservaModel.getReservasByUsuario(id_usuario);
            return reservas;
        } catch (error) {
            console.error("Error fetching reservas by usuario in service:", error);
            throw error;
        }
    }

    static async cancelarReserva(id_reserva) {
        try {
            const reservaActualizada = await ReservaModel.updateReservaEstado(id_reserva, 'cancelada');
            return reservaActualizada;
        } catch (error) {
            console.error("Error canceling reserva in service:", error);
            throw error;
        }
    }

    static async getReservasByCanchaAndDate(id_cancha, fecha) {
        try {
            const reservas = await ReservaModel.getReservasByCanchaAndDate(id_cancha, fecha);
            return reservas;
        } catch (error) {
            console.error("Error fetching reservas by cancha and date in service:", error);
            throw error;
        }
    }

    static async deleteReserva(id_reserva) {
        try {
            const result = await ReservaModel.deleteReserva(id_reserva);
            return result;
        } catch (error) {
            console.error("Error deleting reserva in service:", error);
            throw error;
        }
    }
}