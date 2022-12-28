const { Response, Request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const usuariosGet = (req = Request, res = Response) => {

    const { q, nombre, apikey, page = 1, limit } = req.query;

    res.json({
        message: 'get desde el api',
        q,
        nombre,
        apikey,
        page,
        limit
    })
};

const usuariosPost = async (req, res = Response) => {

    const {
        nombre,
        correo,
        password,
        rol
    } = req.body;


    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });


    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)


    await usuario.save(usuario)

    res.json({
        message: 'post desde el api',
        usuario
    })
}


const usuariosPut = (req, res = Response) => {

    const id = req.params.id

    res.json({
        message: 'put desde el api',
        id
    })
}

const usuariosDelete = (req, res = Response) => {
    res.json({
        message: 'delete desde el api'
    })
}

const usuariosPatch = (req, res = Response) => {
    res.json({
        message: 'patch desde el api'
    })
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
}