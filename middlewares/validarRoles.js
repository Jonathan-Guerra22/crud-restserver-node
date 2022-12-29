const { response, request } = require("express")

const adminRol = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'validacion del rol fallo'
        })
    }

    const { rol } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(403).json({
            msg: 'No tiene permisos para ejecutar esta acción'
        });
    }

    next();
};

const tieneRol = (...roles) => {


    return (req = request, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'validacion del rol fallo'
            })
        }

        const { rol } = req.usuario;

        if (!roles.includes(rol)) {
            return res.status(403).json({
                msg: 'No tiene permisos para ejecutar esta acción'
            });
        }

        next();

    };

};

module.exports = {
    adminRol,
    tieneRol,
}