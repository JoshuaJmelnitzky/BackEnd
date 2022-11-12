const requiereAutenticacion = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.render('logIn');
};


const rechazaAutenticado = (req, res, next)=> {
    if (req.isAuthenticated()) return res.render('index', {name: req.session.usuario});
    next();
};


module.exports = {
    requiereAutenticacion,
    rechazaAutenticado
}