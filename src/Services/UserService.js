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
    
}