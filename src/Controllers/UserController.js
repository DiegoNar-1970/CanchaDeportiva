import { UserService } from "../Services/UserService.js";

export class UserController {

    static async createUser(req, res) {// Log the request body for debugging
        try {

            const userData = req.body;

            const userId = await UserService.createUser(userData);
            
            console.log("User created with ID:", userId);
            res.status(201).json({ message: "User created successfully", user:userId });

        }catch (error) {

            console.error("Error creating user in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error });

        }
    }

    static async getAllUsers(req, res) {
        try {

            const users = await UserService.getAllUsers();
            res.status(200).json(users);

        } catch (error) {

            console.error("Error fetching users in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });

        }
    }
    static async getUserByEmail(req, res) {
        try {
            const { email, password } = req.body;

            console.log("Request body in getUserByEmail:", req.body);

            const user = await UserService.getUserByEmail(email);

            if(user.status) {
                return res.status(404).json({ message: user.message, status: user.status }); // Handle case where user is not found
            }

            if (!user) {
                return res.status(404).json({ message: "User not found", status: "error" });
            }

            if (user.contraseña != password) {
                return res.status(401).json({ message: "Invalid password", status: "error" });
            }

            const {contraseña, fecha_registro, ...userSecure} = user

            res.status(200).json({user: userSecure, message: "User found successfully",status: "ok"});
        } catch (error) {
            console.error("Error fetching user by email in controller:", error);
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}