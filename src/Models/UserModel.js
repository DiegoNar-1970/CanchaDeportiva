import { Connection } from "../Config/DbConfig.js";


//esta clase solo maneja la logica de la base de datos
export class UserModel {

    static async createUser(userData) {
        try{
            //desestructuramos para extraer name, email, y password
            const { nombre, email, contraseña, rol } = userData;

            if (!nombre || !email || !contraseña || !rol) {
                throw new Error("All fields are required");
            }
            
            //creamos la query SQL para insertar un nuevo usuario
            const query = "INSERT INTO usuario (nombre, email, contraseña, rol) VALUES ($1, $2, $3, $4) RETURNING *";

            //Ejecutamos la query con los datos del usuario
            const {rows} = await Connection.query(query, [nombre, email, contraseña, rol]);
            return rows
        }catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    static async getAllUsers() {
        const query = "SELECT * FROM usuario";
        try {
            const {rows} = await Connection.query(query);
            return rows;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

}