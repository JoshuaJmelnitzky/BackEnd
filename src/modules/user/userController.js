const sendMail = require('../../../utils/nodemail');
const { CartService } = require('../cart/cartService');
const { UserService } = require('./userService');

const userService = new UserService();
const cartService = new CartService();

const registerView = async (_, res) => {
    res.render("signup");
}

const registerNewUser = async (req, res) => {
    // sendMail(req.body);
    res.render('logIn');
}

const failRegister = async (req, res) => {
   res.render("failedSignUp");
}

const loginView = async (req, res) => {
    res.render("logIn");
}

const loginUser = async (req, res) => {
    const user =  req.body.username;

    userService.findUser(user).then((e)=> {
        cartService.createCart(e).then( id => {
            req.session.cart = id;
            req.session.usuario = user;
            res.redirect('/productos');
        });
    });
};

const failLogin = async (req, res) => {
    res.render("failedLogIn");
}

const logout = async (req, res) => {
    const user = req.session.usuario;
    req.session.destroy((err) => {
        console.log(err);
        res.render('logOut', {name: user});
    });
}

module.exports = {
    registerView,
    registerNewUser,
    failRegister,
    loginView,
    loginUser,
    failLogin,
    logout
}

