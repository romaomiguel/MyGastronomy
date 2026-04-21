import { Mongo } from '../database/mongo.js';
import { ObjectId } from 'mongodb';

const collectionName = 'ordes'

export default class OrdersDataAccess {
    //Recupera os pedidos do banco de dados, incluindo os detalhes dos itens e do usuário associado a cada pedido
    async getOrders() {
        const result = await Mongo.db
        .collection(collectionName)
        .aggregate([
            {
                $lookup: {
                    from: 'orderItems',
                    localField: '_id',
                    foreignField: 'orderId',
                    as: 'orderItems'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $project: {
                    'userDetails.password': 0,
                    'userDetails.salt': 0
                }
            },
            {
                $unwind: '$orderItems',
            },
            {
                $lookup: {
                    from: 'plates',
                    localField: 'orderItems.plateId',
                    foreignField: '_id',
                    as: 'orderItems.itemDetails'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    userDetails: { $first: "$userDetails" },
                    orderItems: { $push: "$orderItems" },
                    pickupStatus: { $first: "$pickupStatus" },
                    pickupTime: { $first: "$pickupTime" },
                }
            }
        ])
        .toArray();

        return result;
    };

    async getOrdersByUserId(userId) {
        const result = await Mongo.db
        .collection(collectionName)
        .aggregate([
            {
                $match: {userId: new ObjectId(userId)}
            },
            {
                $lookup: {
                    from: 'orderItems',
                    localField: '_id',
                    foreignField: 'orderId',
                    as: 'orderItems'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $project: {
                    'userDetails.password': 0,
                    'userDetails.salt': 0
                }
            },
            {
                $unwind: '$orderItems',
            },
            {
                $lookup: {
                    from: 'plates',
                    localField: 'orderItems.plateId',
                    foreignField: '_id',
                    as: 'orderItems.itemDetails'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    userDetails: { $first: "$userDetails" },
                    orderItems: { $push: "$orderItems" },
                    pickupStatus: { $first: "$pickupStatus" },
                    pickupTime: { $first: "$pickupTime" },
                }
            }
        ])
        .toArray();

        return result;
    }


    //Cria um novo pedido e associa os itens a ele
    async addOrders(data) {
        //Desestruturação para separar os itens do restante dos dados do pedido
        const { items, ...orderDataRest } = data;

        //Adiciona campos necessários para o pedido e converte o userId para ObjectId
        orderDataRest.createdAt = new Date();
        orderDataRest.pickupStatus = 'Pending';
        orderDataRest.userId = new ObjectId(orderDataRest.userId);

        //Insere o pedido no banco de dados e verifica se a inserção foi bem-sucedida
        const newOrder = await Mongo.db
        .collection(collectionName)
        .insertOne(orderDataRest);

        if(!newOrder.insertedId) {
            throw new Error('Failed to create order');
        }


        //Resgata o ID do pedido e das ordens criado para associar aos itens
        items.map((item) => {
            item.plateId = new ObjectId(item.plateId);
            item.orderId = new ObjectId(newOrder.insertedId);
        })

        //Insere os itens associados ao pedido no banco de dados na tabela orderItems
        const result = await Mongo.db
        .collection('orderItems')
        .insertMany(items);

        return result;
    }
    //Deleta um pedido do banco de dados
    async deleteOrders(ordersId) {

        const itemsToDelete = await Mongo.db
        .collection('orderItems')
        .deleteMany({ orderId: new ObjectId(ordersId) });



        const orderToDelete = await Mongo.db
        .collection(collectionName)
        .findOneAndDelete({ _id: new ObjectId(ordersId) });

        const result = {
            itemsToDelete,
            orderToDelete
        }

        return result;
    }

    //Atualiza um pedido do banco de dados
    async updateOrders(orderId, data) {
            const result = await Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(orderId) },
                { $set: data }
            );

            return result;
        }


}