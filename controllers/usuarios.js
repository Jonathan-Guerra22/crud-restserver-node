const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {


    const { limite = 5, desde = 0 } = req.query

    const query = {
        status: true,
    }

    // const usuarios = await usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite))
    //     ;

    // const totalUsuariosEnBD = await usuario.countDocuments(query);

    const [
        totalUsuariosEnBD,
        usuarios
    ] = await Promise.all([
        await Usuario.countDocuments(query),
        await Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ,
    ])

    res.json({
        totalUsuariosEnBD,
        usuariosTraidos: usuarios.length,
        usuarios
    })



    // const { q, nombre, apikey, page = 1, limit } = req.query;

    // res.json({
    //     message: 'get desde el api',
    //     q,
    //     nombre,
    //     apikey,
    //     page,
    //     limit
    // })
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


    await Usuario.save(usuario)

    res.json({
        usuario
    })
}


const usuariosPut = async (req, res = Response) => {

    const { id } = req.params
    const { _id, password, correo, google, ...resto } = req.body

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        usuario
    })
}

const usuariosDelete = async (req, res = Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { status: false })

    res.json({
        message: `Se elimino el usuario ${usuario.nombre} con id ${id}`
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