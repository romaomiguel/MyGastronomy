import { ok, serverError } from '../helpers/httpResponse.js';
import OrderDataAccess from '../dataAccess/orders.js';

export default class OrdersDataAccess {
    constructor() {
        this.dataAccess = new OrderDataAccess();
    }

    async getOrders() {
        try {
            const result = await this.dataAccess.getOrders();
            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }

    async getOrdersByUserId(userId) {
        try {
            const result = await this.dataAccess.getOrdersByUserId(userId);
            return ok(result);
            
        } catch (error) {
            return serverError(error);
        }
    }


    async addOrders(orderData) {
        try {
            const newOrder = await this.dataAccess.addOrders(orderData);
            return ok(newOrder);


        } catch (error) {
            console.log(error)
            return serverError(error);
        }
    }


    async deleteOrders(orderId) {
        try {
            const result = await this.dataAccess.deleteOrders(orderId);
            return ok(result);
            
        } catch (error) {
            return serverError(error);
        }
    }

    async updateOrders(ordersId, data) {
        try {
            const result = await this.dataAccess.updateOrders(ordersId, data);
            return ok(result);
            
        } catch (error) {
            return serverError(error);
        }
    }
}