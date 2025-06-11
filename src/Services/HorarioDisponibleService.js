import { HorarioDisponibleModel } from '../Models/HorarioDisponibleModel.js';

export class HorarioDisponibleService {
    static async createHorario(horarioData) {
        try {
            const horarioId = await HorarioDisponibleModel.createHorario(horarioData);
            return horarioId;
        } catch (error) {
            console.error("Error creating horario in service:", error);
            throw error;
        }
    }

    static async getHorariosByCancha(id_cancha) {
        try {
            const horarios = await HorarioDisponibleModel.getHorariosByCancha(id_cancha);
            return horarios;
        } catch (error) {
            console.error("Error fetching horarios by cancha in service:", error);
            throw error;
        }
    }

    static async deleteHorario(id_horario) {
        try {
            const result = await HorarioDisponibleModel.deleteHorario(id_horario);
            return result;
        } catch (error) {
            console.error("Error deleting horario in service:", error);
            throw error;
        }
    }
}