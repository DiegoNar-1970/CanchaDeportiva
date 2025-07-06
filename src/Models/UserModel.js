import { Connection } from "../Config/DbConfig.js";


//esta clase solo maneja la logica de la base de datos
export class UserModel {

    static async createUser(userData) {
        try{
            //desestructuramos para extraer name, email, y password
            const { nombre, email, password, rol } = userData;
            console.log("esto llego:", userData);

            const query = "INSERT INTO usuario (nombre, email, contraseña, rol) VALUES ($1, $2, $3, $4) RETURNING *";

            //Ejecutamos la query con los datos del usuario
            const {rows} = await Connection.query(query, [nombre, email, password, rol]);
            return rows[0]
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
    static async getUserByEmail(email) {
        const query = "SELECT * FROM usuario WHERE email = $1";
        try {
            const { rows } = await Connection.query(query, [email]);

            if (rows.length === 0) {
                return { message: "User not found", status: "error" }; // No user found with the given email
            }
            
            return rows[0];
        } catch (error) {
            console.error("Error fetching user by email:", error);
            throw error;
        }
    }
}