const { Response, Request } = require('express')


const usuariosGet = (req = Request, res = Response) => {

    const {q, nombre, apikey, page = 1, limit} = req.query;

    res.json({
        message: 'get desde el api',
        q,
        nombre,
        apikey,
        page,
        limit
    })
};

const usuariosPost = (req, res = Response) => {

    const {edad, nombre} = req.body;

    res.json({
        message: 'post desde el api',
        edad,
        nombre
    })
}


const usuariosPut = (req, res = Response) => {

    const id = req.params.id

    res.json({
        message: 'put desde el api',
        id
    })
}

const usuariosDelete =  (req, res = Response) => {
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