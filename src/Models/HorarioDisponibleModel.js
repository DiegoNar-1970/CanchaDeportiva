import { Connection } from "../Config/DbConfig.js";

export class HorarioDisponibleModel {
    static async createHorario(horarioData) {
        try {
            const { id_cancha, dia_semana, hora_inicio, hora_fin } = horarioData;

            if (!id_cancha || !dia_semana || !hora_inicio || !hora_fin) {
                throw new Error("All fields are required");
            }

            const query = `
                INSERT INTO horario_disponible (id_cancha, dia_semana, hora_inicio, hora_fin) 
                VALUES ($1, $2, $3, $4) 
                RETURNING id_horario
            `;
            const { rows } = await Connection.query(query, [id_cancha, dia_semana, hora_inicio, hora_fin]);
            return rows[0].id_horario;
        } catch (error) {
            console.error("Error creating horario:", error);
            throw error;
        }
    }

    static async getHorariosByCancha(id_cancha) {
        const query = "SELECT * FROM horario_disponible WHERE id_cancha = $1";
        try {
            const { rows } = await Connection.query(query, [id_cancha]);
            return rows;
        } catch (error) {
            console.error("Error fetching horarios by cancha:", error);
            throw error;
        }
    }

    static async deleteHorario(id_horario) {
        const query = "DELETE FROM horario_disponible WHERE id_horario = $1 RETURNING id_horario";
        try {
            const { rows } = await Connection.query(query, [id_horario]);
            return rows[0];
        } catch (error) {
            console.error("Error deleting horario:", error);
            throw error;
        }
    }
}