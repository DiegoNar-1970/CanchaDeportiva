import { UserModel } from '../Models/UserModel.js';

export class UserService {

    static async createUser(userData) {
        try {
            const userId = await UserModel.createUser(userData);
            return userId;
        } catch (error) {
            console.error("Error creating user in service:", error);
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            const users = await UserModel.getAllUsers();
            return users;
        } catch (error) {
            console.error("Error fetching users in service:", error);
            throw error;
        }
    }
    static async getUserByEmail(email) {
        try {
            const user = await UserModel.getUserByEmail(email);
            if(user.status) {
                return { message: user.message, status: user.status }; // Handle case where user is not found
            }
            return user;
        } catch (error) {
            console.error("Error fetching user by email in service:", error);
            throw error;
        }
    }

}