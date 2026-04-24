import express from 'express';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import crypto from 'crypto';
import { Mongo } from '../database/mongo.js';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const collectionName = 'users' /* TABELA */

/* FUNCTION PARA ENCRIPTAÇÃO DE SENHA */

passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, callback) => {
        const user = await Mongo.db
        .collection(collectionName)
        .findOne({ email: email })

        if (!user) {
            return callback(null, false, { message: 'Incorrect email.'});
        }


        const saltBuffer = user.salt.buffer
        crypto.pbkdf2(password, saltBuffer, 310000, 16, 'sha256', (err, derivedKey) => {
            if (err) {
                return callback(null, false);
            }

            const userPasswordBuffer = Buffer.from(user.password.buffer);
            
            if(!crypto.timingSafeEqual(derivedKey, userPasswordBuffer)) {
                return callback(null, false, { message: 'Incorrect password.' });
            }


            const { password, salt, ...rest} = user;

            return callback(null, rest);
        })
    }))

const authRouter = express.Router();


/* ROTA DE AUTHENTICAÇÃO COM O BANCO DE DADOS E ENCRIPTAÇÃO DE DADOS*/
authRouter.post('/signup', async (req, res) => {
    const checkUser = await Mongo.db
        .collection(collectionName)
        .findOne({ email: req.body.email });

    if (checkUser) {
        return res.status(500).send({
            success: false,
            statuscode: 500,
            body: {
                text: 'User already exists.'
            }
        });
    }

    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 16, 'sha256', async (err, derivedKey) => {
        if (err) {
            return res.status(500).send({
                success: false,
                statuscode: 500,
                body: {
                    text: 'Error during password encryption.',
                    error: err
                }
            });
        }

        const result = await Mongo.db
            .collection(collectionName)
            .insertOne({
                email: req.body.email,
                password: derivedKey,
                salt
            });

        if (result.insertedId) {
            const user = await Mongo.db
                .collection(collectionName)
                .findOne(
                    { _id: new ObjectId(result.insertedId) });

        const { password, salt, ...rest } = user;
        const token = jwt.sign({ user: rest }, 'secret')
    
        return res.send({
            success: true,
            statuscode: 200,
            body: {
                text: 'User registered successfully.',
                token,
                user: rest,
                logged: true
            }
        })
    }
})
})


/* ROTA DE LOGIN (AUTHENTICAÇÃO POR MEIO DE PASSPORT) */
authRouter.post('/login', (req, res) => {
    passport.authenticate('local', (err, user) => {
        if(err) {
            return res.status(500).send({
                success: false,
                statuscode: 500,
                body: {
                    text: 'Error during authentication.',
                    error: err
                }
            })
        }

        if(!user) {
            return res.status(400).send({
                success: false,
                statuscode: 400,
                body: {
                    text: 'User not found or incorrect password.'
                }
            })
        }

        const token = jwt.sign(user, 'secret')
        return res.status(200).send({
            success: true,
            statuscode: 200,
            body: {
                text: 'User logged in successfully.',
                user,
                logged: true,
                token
            }
        })
    })(req, res);
})

export default authRouter