const { response, request } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'usuario',
    'categoria',
    'productos',
    'roles',
]

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const usuario = await Usuario.findById(termino)

        res.json({
            results: usuario ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i');


    const usuario = await Usuario.find({
        $or: [
            { nombre: regex },
            { correo: regex },
        ],
        $and: [
            { status: true },
        ]
    })

    res.json({
        results: usuario ? [usuario] : []
    })

}


const buscarCategorias = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const categoria = await Categoria.findById(termino)

        res.json({
            results: categoria ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i');


    const categoria = await Categoria.find({
        $or: [
            { nombre: regex },
        ],
        $and: [
            { status: true },
        ]
    })

    res.json({
        results: categoria ? [categoria] : []
    })

}


const buscarProductos = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const producto = await Producto.findById(termino)
                                        .populate('categoria', 'nombre')
                                        .populate('usuario', ['nombre', 'correo'])

        res.json({
            results: producto ? [producto] : []
        })
    }

    const regex = new RegExp(termino, 'i');


    const producto = await Producto.find({
        $or: [
            { nombre: regex },
            { correo: regex },
        ],
        $and: [
            { status: true },
        ]
    })
    .populate('categoria', 'nombre')
    .populate('usuario', ['nombre', 'correo'])



    res.json({
        results: producto ? [producto] : []
    })

}

const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(401).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuario':
            buscarUsuarios(termino, res)
            break;
        case 'categoria':
            buscarCategorias(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;

        default:
            return res.status(500).json({
                msg: 'Ocurrio un problema'
            });
    }
}


module.exports = {
    buscar
}