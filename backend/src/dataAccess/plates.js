import { Mongo } from '../database/mongo.js';
import { ObjectId } from 'mongodb';

const collectionName = 'plates'

export default class PlatesDataAccess {
    async getPlates() {
        const result = await Mongo.db
        .collection(collectionName)
        .find({})
        .toArray();

        return result;
    }

    async getAvaliablePlates() {
        const result = await Mongo.db
        .collection(collectionName)
        .find({ available: true })
        .toArray();

        return result;
    }


    async addPlates(data) {
        const result = await Mongo.db
        .collection(collectionName)
        .insertOne(data);

        return result;
    }

    async deletePlate(plateId) {
        const result = await Mongo.db
        .collection(collectionName)
        .findOneAndDelete({ _id: new ObjectId(plateId) });

        return result;
    }

    async updatePlate(plateId, data) {
            const result = await Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(plateId) },
                { $set: data }
            );

            return result;
        }


}