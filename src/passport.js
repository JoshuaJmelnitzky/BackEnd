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


    const saveUser = async (nuevoUsuario) => {
        await mongo.db("ecommerce").collection("usuarios").insertOne({
            username: nuevoUsuario[0].username, 
            password: nuevoUsuario[0].password, 
            name: nuevoUsuario[0].name,
            address: nuevoUsuario[0].address,
            age: nuevoUsuario[0].age,
            phone: nuevoUsuario[0].phone
        });
    };


    passport.use('signup', new LocalStrategy({passReqToCallback: true},  async (req, username, password, callback) => {
        const user = await findUser(username);
        if (user.length !== 0) return callback(null, false, { message: 'El usuario ya está registrado'});
        const passwordBcrypt = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const nuevoUsuario = [{ 
            name: req.body.name,
            username, 
            password: passwordBcrypt,
            address: req.body.address,
            age: req.body.age,
            phone: req.body.phone
        }];
        saveUser(nuevoUsuario);
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