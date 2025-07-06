import { Connection } from "../Config/DbConfig.js";

export class CanchaModel {

    static async createCancha(canchaData) {
        try {
            const { nombre_cancha, tipo, precio_hora, estado,img } = canchaData;

            console.log('data dentro',canchaData)
            const query = "INSERT INTO cancha (nombre_cancha, tipo, precio_hora, estado, img) VALUES ($1, $2, $3, $4, $5) RETURNING id_cancha";
            const { rows } = await Connection.query(query, [nombre_cancha, tipo, precio_hora, estado, img]);
            return rows[0].id_cancha;
        } catch (error) {
            console.error("Error creating cancha:", error);
            throw error;
        }
    }

    static async getAllCanchas() {
        const query = "SELECT * FROM cancha";
        try {
            const { rows } = await Connection.query(query);
            return rows;
        } catch (error) {
            console.error("Error fetching canchas:", error);
            throw error;
        }
    }

    static async getCanchaById(id_cancha) {
        const query = "SELECT * FROM cancha WHERE id_cancha = $1";
        try {
            const { rows } = await Connection.query(query, [id_cancha]);
            return rows[0];
        } catch (error) {
            console.error("Error fetching cancha by ID:", error);
            throw error;
        }
    }

static async updateCancha(id_Cancha, canchaData) {
    try {
        const { nombre_cancha, tipo, precio_hora, estado, img } = canchaData;
        
        const query = `
            UPDATE cancha 
            SET 
                nombre_cancha = $1, 
                tipo = $2, 
                precio_hora = $3, 
                estado = $4, 
                img = $5
            WHERE id_cancha = $6
            RETURNING *`;
            
        const { rows } = await Connection.query(query, [
            nombre_cancha, 
            tipo, 
            precio_hora, 
            estado, 
            img, 
            id_Cancha
        ]);
        
        if (rows.length === 0) {
            throw new Error('Cancha no encontrada');
        }
        
        return rows[0];
    } catch (error) {
        console.error("Error updating cancha:", error);
        throw error;
    }
}

    static async deleteCancha(id_cancha) {
        const query = "DELETE FROM cancha WHERE id_cancha = $1 RETURNING id_cancha";
        try {
            const { rows } = await Connection.query(query, [id_cancha]);
            return rows[0];
        } catch (error) {
            console.error("Error deleting cancha:", error);
            throw error;
        }
    }

    static async getAvailableCanchas(fecha, hora_inicio, hora_fin) {
        const query = `
            SELECT c.* 
            FROM cancha c
            WHERE c.estado = 'disponible'
            AND c.id_cancha NOT IN (
                SELECT r.id_cancha 
                FROM reserva r
                WHERE r.fecha_reserva = $1
                AND (
                    (r.hora_inicio < $3 AND r.hora_fin > $2)
                    OR (r.hora_inicio >= $2 AND r.hora_inicio < $3)
                    OR (r.hora_fin > $2 AND r.hora_fin <= $3)
                )
                AND r.estado != 'cancelada'
            )
        `;
        try {
            const { rows } = await Connection.query(query, [fecha, hora_inicio, hora_fin]);
            return rows;
        } catch (error) {
            console.error("Error fetching available canchas:", error);
            throw error;
        }
    }
}