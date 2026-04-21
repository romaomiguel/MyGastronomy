import express from 'express';
import PlateController from '../controllers/plates.js';

const platesRouter = express.Router();
const plateController = new PlateController();


platesRouter.get('/', async (req, res) => {
    const { sucess, statuscode, body } = await plateController.getPlates();

    res.status(statuscode).send({
        sucess,
        statuscode,
        body
    })
})

platesRouter.get('/available', async (req, res) => {
    const { sucess, statuscode, body } = await plateController.getAvaliablePlates();

    res.status(statuscode).send({
        sucess,
        statuscode,
        body
    })
})

platesRouter.post('/', async (req, res) => {
    const { sucess, statuscode, body } = await plateController.addPlate(req.body);

    res.status(statuscode).send({
        sucess,
        statuscode,
        body
    })
})


platesRouter.delete('/:id', async (req, res) => {
    const { sucess, statuscode, body } = await plateController.deletePlate(req.params.id);

    res.status(statuscode).send({
        sucess,
        statuscode,
        body
    })
})

platesRouter.put('/:id', async (req, res) => {
    const {sucess, statuscode, body} = await plateController.updatePlate(req.params.id, req.body);

    res.status(statuscode).send({
        sucess,
        statuscode,
        body
    })
})


export default platesRouter
