const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { UserService } = require('../modules/user/userService');

const userService = new UserService();

const connectMongo = ( async () => {

    passport.use('signup', new LocalStrategy({passReqToCallback: true},  async (req, username, password, callback) => {
        const user = await userService.findUser(username);;
        if (user.length !== 0) return callback(null, false, { message: 'El usuario ya está registrado'});
        const passwordBcrypt = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const nuevoUsuario = { 
            name: req.body.name,
            username, 
            password: passwordBcrypt,
            address: req.body.address,
            age: req.body.age,  
            phone: req.body.phone
        };
        await userService.saveUser(nuevoUsuario)
        callback(null, nuevoUsuario);
    }));


    passport.use('login', new LocalStrategy( async (username, password, callback) => {
        const user = await userService.findUser(username);
        if (user.length == 0 || !bcrypt.compareSync(password, user.password)) return callback(null, false, { message: 'Usuario no registrado o password incorrecto'});
        callback(null, user);
    }));    


    passport.serializeUser((user, callback) => {
        callback(null, user.username);
    });


    passport.deserializeUser((username, callback) => {
        const user = userService.findUser(username);;
        callback(null, user);
    });    
}) ();

module.exports = passport;