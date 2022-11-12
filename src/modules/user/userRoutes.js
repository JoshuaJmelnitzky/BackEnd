const {registerView, registerNewUser, failRegister, loginView, loginUser, failLogin, logout} = require('./userController');
const {requiereAutenticacion, rechazaAutenticado} = require('../../middlewares'); 
const router = require('express').Router();
const multer = require('multer');
const passport = require('../../passport');

// Guardar avatar usuarios
const storage = multer.diskStorage({
    destination: './public/avatars',
    filename: (req, _ , cb) => {
        const fileName = req.body.username + ".jpeg";
        cb(null, fileName)
    }
});

const uploader = multer({storage});

// Rutas de registro de nuevo usuario.
router.get("/signup", registerView);

router.post('/signup', uploader.single('thumbnail'), passport.authenticate('signup', {failureRedirect: '/failsignup', failureMessage: true}), registerNewUser);

router.get("/failsignup", failRegister);


// Rutas de inicio de sesión de usuario ya registrado.
router.get('/login', rechazaAutenticado, loginView);

router.post("/login", passport.authenticate('login', {failureRedirect: '/faillogin', failureMessage: true}), loginUser);

router.get("/faillogin", rechazaAutenticado, failLogin);


// Cerrar sesión
router.get('/logout', requiereAutenticacion, logout);

module.exports = router; 