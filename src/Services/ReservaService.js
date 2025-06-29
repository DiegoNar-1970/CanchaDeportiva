import { ReservaModel } from '../Models/ReservaModel.js';

export class ReservaService {
    static async createReserva(reservaData) {
        try {
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
    
    static getAllReservas = async () => {
        try {
            const reservas = await ReservaModel.getAllReservas();
            return reservas;
        } catch (error) {
            console.error("Error fetching all reservas in service:", error);
            throw error;
        }
    }
    static updateReserva = async (data) => {
        try {
            const reservas = await ReservaModel.updateReserva(data);
            return reservas;
        } catch (error) {
            console.error("Error fetching all reservas in service:", error);
            throw error;
        }
    }
}