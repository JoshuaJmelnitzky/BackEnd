const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { MongoClient } = require('mongodb');
const { MONGO_CONNECTION } = process.env;

const connectMongo = ( async () => {
    const mongo = new MongoClient(MONGO_CONNECTION);
    err => {
        if (err) throw new Error('Error al conectar a Mongo Atlas');
    }
    await mongo.connect();


    const findUser = async (username) => {
        return await mongo.db("ecommerce").collection("usuarios").find({username}).toArray();
    };


    const saveUser = async (username, password) => {
        await mongo.db("ecommerce").collection("usuarios").insertOne({username, password});
    };


    passport.use('signup', new LocalStrategy( async (username, password, callback) => {
        const user = await findUser(username);
        if (user.length !== 0) return callback(null, false, { message: 'El usuario ya está registrado'});
        const passwordBcrypt = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        saveUser(username, passwordBcrypt);
        const nuevoUsuario = [{ username, password: passwordBcrypt }];
        callback(null, nuevoUsuario);
    }));


    passport.use('login', new LocalStrategy( async (username, password, callback) => {
        const user = await findUser(username);
        if (user.length == 0 || !bcrypt.compareSync(password, user[0].password)) return callback(null, false, { message: 'Usuario no registrado o password incorrecto'});
        callback(null, user);
    }));    


    passport.serializeUser((user, callback) => {
        callback(null, user[0].username);
    });


    passport.deserializeUser((username, callback) => {
        const user = findUser(username);
        callback(null, user);
    });    
}) ();

module.exports = passport;