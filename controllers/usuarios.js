const { Response, Request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

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


const usuariosPut = async(req, res = Response) => {

    const {id} = req.params
    const {_id, password, correo, google, ...resto} = req.body

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        message: 'put desde el api',
        usuario
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