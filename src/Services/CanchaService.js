import { CanchaModel } from '../Models/CanchaModel.js';

export class CanchaService {
    static async createCancha(canchaData) {
        try {
            const canchaId = await CanchaModel.createCancha(canchaData);
            return canchaId;
        } catch (error) {
            console.error("Error creating cancha in service:", error);
            throw error;
        }
    }

    static async getAllCanchas() {
        try {
            const canchas = await CanchaModel.getAllCanchas();
            return canchas;
        } catch (error) {
            console.error("Error fetching canchas in service:", error);
            throw error;
        }
    }

    static async getCanchaById(id_cancha) {
        try {
            const cancha = await CanchaModel.getCanchaById(id_cancha);
            return cancha;
        } catch (error) {
            console.error("Error fetching cancha by ID in service:", error);
            throw error;
        }
    }

    static async updateCancha(id_cancha, canchaData) {
        try {
            const updatedCancha = await CanchaModel.updateCancha(id_cancha, canchaData);
            return updatedCancha;
        } catch (error) {
            console.error("Error updating cancha in service:", error);
            throw error;
        }
    }

    static async deleteCancha(id_cancha) {
        try {
            const result = await CanchaModel.deleteCancha(id_cancha);
            return result;
        } catch (error) {
            console.error("Error deleting cancha in service:", error);
            throw error;
        }
    }

    static async getAvailableCanchas(fecha, hora_inicio, hora_fin) {
        try {
            const availableCanchas = await CanchaModel.getAvailableCanchas(fecha, hora_inicio, hora_fin);
            return availableCanchas;
        } catch (error) {
            console.error("Error fetching available canchas in service:", error);
            throw error;
        }
    }
}