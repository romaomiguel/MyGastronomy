import express from 'express';
import UserController from '../controllers/users.js';

const usersRouter = express.Router();
const userController = new UserController();


usersRouter.get('/', async (req, res) => {
    const { sucess, statuscode, body } = await userController.getUsers();

    res.status(statuscode).send({
        sucess,
        statuscode,
        body
    })
})

usersRouter.delete('/:id', async (req, res) => {
    const { sucess, statuscode, body } = await userController.deleteUser(req.params.id);

    res.status(statuscode).send({
        sucess,
        statuscode,
        body
    })
})

usersRouter.put('/:id', async (req, res) => {
    const {sucess, statuscode, body} = await userController.updateUser(req.params.id, req.body);

    res.status(statuscode).send({
        sucess,
        statuscode,
        body
    })
})


export default usersRouter
