const { request, response } = require("express");
const { Producto } = require('../models')

const crearProducto = async (req = request, res = response) => {

    const {status , usuario , ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if (productoDB) {
        return res.status(401).json({
            msg: 'El producto ya existe'
        })
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = await Producto(data);

    await producto.save();


    res.status(201).json({
        producto
    });

};


const obtenerProductos = async (req = request, res = response) => {


    const { limite = 5, desde = 0 } = req.query

    const query = {
        status: true,
    }

    const [
        totalProductosEnBD,
        productos
    ] = await Promise.all([
        await Producto.countDocuments(query),
        await Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
        ,
    ])

    res.json({
        totalProductosEnBD,
        productosTraidas: productos.length,
        productos
    })
}


const obtenerProducto = async (req = request, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findById(id)
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json({
        producto
    })
}

const actualizarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const { status, usuario, ...data } = req.body

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase()
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json({
        producto
    });
}

const eliminarProducto = async (req = request, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json({
        producto
    })
}



module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    eliminarProducto,
}