import { Mongo } from '../database/mongo.js';
import { ObjectId } from 'mongodb';
import crypto from 'crypto';

const collectionName = 'users'

export default class UserDataAccess {
    async getUsers() {
        const result = await Mongo.db
        .collection(collectionName)
        .find({})
        .toArray();

        return result;
    }

    async deleteUser(id) {
        const result = await Mongo.db
        .collection(collectionName)
        .findOneAndDelete({ _id: new ObjectId(id) });

        return result;
    }

    async updateUser(id, data) {
        if(data.password) {
            
            const salt = crypto.randomBytes(16);
            crypto.pbkdf2(data.password, salt, 310000, 16, 'sha256', async (err, derivedKey) => {
                if (err) {
                    throw new Error('Error during password encryption');
                }
                
                data = {...data, password: derivedKey, salt };


                const result = await Mongo.db
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: data }
                );

                return result;
        
        })

        }else {
            const result = await Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: data }
            );

            return result;
        }


    }


}