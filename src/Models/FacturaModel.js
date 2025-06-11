
import { Connection } from "../Config/DbConfig.js";

export class FacturaModel {
    static async createFactura(facturaData) {
        try {
            const { id_reserva, fecha_emision, monto, metodo_pago } = facturaData;

            if (!id_reserva || !fecha_emision || !monto || !metodo_pago) {
                throw new Error("All fields are required");
            }

            const query = `
                INSERT INTO factura 
                (id_reserva, fecha_emision, monto, metodo_pago) 
                VALUES ($1, $2, $3, $4) 
                RETURNING id_factura
            `;
            const { rows } = await Connection.query(query, [
                id_reserva, fecha_emision, monto, metodo_pago
            ]);
            return rows[0].id_factura;
        } catch (error) {
            console.error("Error creating factura:", error);
            throw error;
        }
    }

    static async getFacturaById(id_factura) {
        const query = `
            SELECT f.*, r.id_usuario, r.fecha_reserva, u.nombre as usuario_nombre
            FROM factura f
            JOIN reserva r ON f.id_reserva = r.id_reserva
            JOIN usuario u ON r.id_usuario = u.id_usuario
            WHERE f.id_factura = $1
        `;
        try {
            const { rows } = await Connection.query(query, [id_factura]);
            return rows[0];
        } catch (error) {
            console.error("Error fetching factura by ID:", error);
            throw error;
        }
    }

    static async getFacturasByUsuario(id_usuario) {
        const query = `
            SELECT f.*, r.fecha_reserva, c.nombre_cancha
            FROM factura f
            JOIN reserva r ON f.id_reserva = r.id_reserva
            JOIN cancha c ON r.id_cancha = c.id_cancha
            WHERE r.id_usuario = $1
            ORDER BY f.fecha_emision DESC
        `;
        try {
            const { rows } = await Connection.query(query, [id_usuario]);
            return rows;
        } catch (error) {
            console.error("Error fetching facturas by usuario:", error);
            throw error;
        }
    }

    static async getFacturasByDateRange(fecha_inicio, fecha_fin) {
        const query = `
            SELECT f.*, u.nombre as usuario_nombre, c.nombre_cancha
            FROM factura f
            JOIN reserva r ON f.id_reserva = r.id_reserva
            JOIN usuario u ON r.id_usuario = u.id_usuario
            JOIN cancha c ON r.id_cancha = c.id_cancha
            WHERE f.fecha_emision BETWEEN $1 AND $2
            ORDER BY f.fecha_emision
        `;
        try {
            const { rows } = await Connection.query(query, [fecha_inicio, fecha_fin]);
            return rows;
        } catch (error) {
            console.error("Error fetching facturas by date range:", error);
            throw error;
        }
    }

    static async deleteFactura(id_factura) {
        const query = "DELETE FROM factura WHERE id_factura = $1 RETURNING id_factura";
        try {
            const { rows } = await Connection.query(query, [id_factura]);
            return rows[0];
        } catch (error) {
            console.error("Error deleting factura:", error);
            throw error;
        }
    }
}