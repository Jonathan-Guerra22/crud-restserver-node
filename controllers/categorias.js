const { request, response } = require("express");
const { Categoria } = require('../models')

const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(401).json({
            msg: 'La cetegoria ya existe'
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await Categoria(data);

    await categoria.save();


    res.status(201).json({
        categoria
    });

};


const obtenerCategorias = async (req = request, res = response) => {


    const { limite = 5, desde = 0 } = req.query

    const query = {
        status: true,
    }

    const [
        totalCategoriasEnBD,
        categorias
    ] = await Promise.all([
        await Categoria.countDocuments(query),
        await Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
        ,
    ])

    res.json({
        totalCategoriasEnBD,
        categoriasTraidas: categorias.length,
        categorias
    })
}


const obtenerCategoria = async (req = request, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        categoria
    })
}

const actualizarCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    const { status, usuario, ...data } = req.body

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json({
        categoria
    });
}

const eliminarCategoria = async (req = request, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json({
        categoria
    })
}



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}