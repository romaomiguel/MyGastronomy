import { ok, serverError } from '../helpers/httpResponse.js';
import PlatesDataAccess from '../dataAccess/plates.js';

export default class PlatesController {
    constructor() {
        this.dataAccess = new PlatesDataAccess();
    }

    async getPlates() {
        try {
            const result = await this.dataAccess.getPlates();
            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }

    async getAvaliablePlates() {
        try {
            const result = await this.dataAccess.getAvaliablePlates();
            return ok(result);
            
        } catch (error) {
            return serverError(error);
        }
    }

    async addPlate(plateData) {
        try {
            const newPlate = await this.dataAccess.addPlates(plateData);
            return ok(newPlate);


        } catch (error) {
            console.log(error)
            return serverError(error);
        }
    }


    async deletePlate(plateId) {
        try {
            const result = await this.dataAccess.deletePlate(plateId);
            return ok(result);
            
        } catch (error) {
            return serverError(error);
        }
    }

    async updatePlate(plateId, data) {
        try {
            const result = await this.dataAccess.updatePlate(plateId, data);
            return ok(result);
            
        } catch (error) {
            return serverError(error);
        }
    }
}