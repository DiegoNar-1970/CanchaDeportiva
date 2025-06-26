import { Connection } from "../Config/DbConfig.js";

export class ReservaModel {

    static async checkCanchaAvailability(id_cancha, fecha_reserva, hora_inicio, hora_fin) {
         const query = `
        SELECT * FROM RESERVA
        WHERE id_cancha = $1
            AND fecha_reserva = $2
            AND (
                (hora_inicio < $4 AND hora_fin > $3)
            )
        `;
        try {
            const { rows } = await Connection.query(query, [id_cancha, fecha_reserva, hora_inicio, hora_fin]);
            return rows.length === 0; 
        } catch (error) {
            console.error("Error checking cancha availability:", error);
            throw error;
        }
    }

    static async createReserva(reservaData) {
        try {
            const isAvailable = await this.checkCanchaAvailability(
                reservaData.id_cancha,
                reservaData.fecha_reserva,
                reservaData.hora_inicio,
                reservaData.hora_fin
            );
            if (!isAvailable) {
                return { error: "La cancha no está disponible en el horario seleccionado." };
            }
            console.log(reservaData,'estamos en el model')
            const { id_usuario, id_cancha, fecha_reserva, hora_inicio, hora_fin, estado, costo_total } = reservaData;

            const query = `
                INSERT INTO reserva 
                (id_usuario, id_cancha, fecha_reserva, hora_inicio, hora_fin, estado, costo_total) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) 
                RETURNING id_reserva
            `;
            const { rows } = await Connection.query(query, [
                id_usuario, id_cancha, fecha_reserva, hora_inicio, hora_fin, estado, costo_total
            ]);
            return rows[0];
        } catch (error) {
            console.error("Error creating reserva:", error);
            throw error;
        }
    }

    static async getReservaById(id_reserva) {
        const query = `
            SELECT r.*, u.nombre as usuario_nombre, c.nombre_cancha 
            FROM reserva r
            JOIN usuario u ON r.id_usuario = u.id_usuario
            JOIN cancha c ON r.id_cancha = c.id_cancha
            WHERE r.id_reserva = $1
        `;
        try {
            const { rows } = await Connection.query(query, [id_reserva]);
            return rows[0];
        } catch (error) {
            console.error("Error fetching reserva by ID:", error);
            throw error;
        }
    }

    static async getReservasByUsuario(id_usuario) {
        const query = `
            SELECT r.*, c.nombre_cancha, c.tipo, c.precio_hora
            FROM reserva r
            JOIN cancha c ON r.id_cancha = c.id_cancha
            WHERE r.id_usuario = $1
            ORDER BY r.fecha_reserva DESC, r.hora_inicio DESC
        `;
        try {
            const { rows } = await Connection.query(query, [id_usuario]);
            return rows;
        } catch (error) {
            console.error("Error fetching reservas by usuario:", error);
            throw error;
        }
    }

    static async updateReservaEstado(id_reserva, estado) {
        const query = `
            UPDATE reserva 
            SET estado = $1 
            WHERE id_reserva = $2 
            RETURNING *
        `;
        try {
            const { rows } = await Connection.query(query, [estado, id_reserva]);
            return rows[0];
        } catch (error) {
            console.error("Error updating reserva estado:", error);
            throw error;
        }
    }

    static async getReservasByCanchaAndDate(id_cancha, fecha) {
        const query = `
            SELECT * FROM reserva 
            WHERE id_cancha = $1 AND fecha_reserva = $2
            ORDER BY hora_inicio
        `;
        try {
            const { rows } = await Connection.query(query, [id_cancha, fecha]);
            return rows;
        } catch (error) {
            console.error("Error fetching reservas by cancha and date:", error);
            throw error;
        }
    }

    static async deleteReserva(id_reserva) {
        const query = "DELETE FROM reserva WHERE id_reserva = $1 RETURNING id_reserva";
        try {
            const { rows } = await Connection.query(query, [id_reserva]);
            return rows[0];
        } catch (error) {
            console.error("Error deleting reserva:", error);
            throw error;
        }
    }

    static async getAllReservas(startDate, endDate) {
        const query = `SELECT * FROM reserva`
        try {
            const { rows } = await Connection.query(query);
            return rows;
        } catch (error) {
            console.error("Error fetching all reservas:", error);
            throw error;
        }
    }
}
