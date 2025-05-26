import { UserService } from "../Services/UserService.js";

export class UserController {

    static async createUser(req, res) {// Log the request body for debugging
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: "Bad request: No data provided" });
            }
            const userData = req.body;
            const userId = await UserService.createUser(userData);
            console.log("User created with ID:", userId);
            res.status(201).json({ message: "User created successfully", userId });

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

}