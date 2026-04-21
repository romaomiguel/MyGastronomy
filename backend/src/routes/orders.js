import express from 'express';
import OrdersController from '../controllers/orders.js';

const ordersRouter = express.Router();
const orderController = new OrdersController();


ordersRouter.get('/', async (req, res) => {
    const { sucess, statuscode, body } = await orderController.getOrders();

    res.status(statuscode).send({
        sucess,
        statuscode,
        body
    })
})

ordersRouter.get('/:id', async (req, res) => {
    const { sucess, statuscode, body } = await orderController.getOrdersByUserId(req.params.id);

    res.status(statuscode).send({
        sucess,
        statuscode,
        body
    })
})

ordersRouter.post('/', async (req, res) => {
    const { sucess, statuscode, body } = await orderController.addOrders(req.body);

    res.status(statuscode).send({
        sucess,
        statuscode,
        body
    })
})


ordersRouter.delete('/:id', async (req, res) => {
    const { sucess, statuscode, body } = await orderController.deleteOrders(req.params.id);

    res.status(statuscode).send({
        sucess,
        statuscode,
        body
    })
})

ordersRouter.put('/:id', async (req, res) => {
    const {sucess, statuscode, body} = await orderController.updateOrders(req.params.id, req.body);

    res.status(statuscode).send({
        sucess,
        statuscode,
        body
    })
})


export default ordersRouter
