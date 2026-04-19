import UserDataAccess from "../dataAccess/user.js";
import { ok, serverError } from '../helpers/httpResponse.js';


export default class UserController {
    constructor() {
        this.dataAccess = new UserDataAccess();
    }

    async getUsers() {
        try {
            const users = await this.dataAccess.getUsers();
            return ok(users);

        } catch (error) {
            return serverError(error);
        }
    }

    async deleteUser(id) {
        try {
            const result = await this.dataAccess.deleteUser(id);
            return ok(result);
            
        } catch (error) {
            return serverError(error);
        }
    }

    async updateUser(id, data) {
        try {
            const result = await this.dataAccess.updateUser(id, data);
            return ok(result);
            
        } catch (error) {
            return serverError(error);
        }
    }
}