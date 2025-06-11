import { FacturaModel } from '../Models/FacturaModel.js';

export class FacturaService {
    static async createFactura(facturaData) {
        try {
            const facturaId = await FacturaModel.createFactura(facturaData);
            return facturaId;
        } catch (error) {
            console.error("Error creating factura in service:", error);
            throw error;
        }
    }

    static async getFacturaById(id_factura) {
        try {
            const factura = await FacturaModel.getFacturaById(id_factura);
            return factura;
        } catch (error) {
            console.error("Error fetching factura by ID in service:", error);
            throw error;
        }
    }

    static async getFacturasByUsuario(id_usuario) {
        try {
            const facturas = await FacturaModel.getFacturasByUsuario(id_usuario);
            return facturas;
        } catch (error) {
            console.error("Error fetching facturas by usuario in service:", error);
            throw error;
        }
    }

    static async getFacturasByDateRange(fecha_inicio, fecha_fin) {
        try {
            const facturas = await FacturaModel.getFacturasByDateRange(fecha_inicio, fecha_fin);
            return facturas;
        } catch (error) {
            console.error("Error fetching facturas by date range in service:", error);
            throw error;
        }
    }

    static async deleteFactura(id_factura) {
        try {
            const result = await FacturaModel.deleteFactura(id_factura);
            return result;
        } catch (error) {
            console.error("Error deleting factura in service:", error);
            throw error;
        }
    }
}