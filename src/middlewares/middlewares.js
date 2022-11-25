const requiereAutenticacion = (req, res, next) => {
    if (!req.isAuthenticated()) return res.render('logIn');;
    next();
};


const rechazaAutenticado = (req, res, next)=> {
    if (req.isAuthenticated()) return res.render('index', {name: req.session.usuario});
    next();
};


module.exports = {
    requiereAutenticacion,
    rechazaAutenticado
}