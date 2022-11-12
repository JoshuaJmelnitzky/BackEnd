const sendMail = require('../../../utils/nodemail');

const registerView = async (_, res) => {
    res.render("signup");
}

const registerNewUser = async (req, res) => {
    sendMail(req.body);
    res.render('logIn');
}

const failRegister = async (req, res) => {
   res.render("failedSignUp");
}

const loginView = async (req, res) => {
    res.render("logIn");
}

const loginUser = async (req, res) => {
    req.session.usuario = req.body.username;
    res.redirect('./productos');
}

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

