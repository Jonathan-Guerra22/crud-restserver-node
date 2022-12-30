const { request, response } = require("express")
const path = require("path")
const fs = require("fs")


const { subirArchivo } = require("../helpers")
const { Usuario, Producto } = require("../models")


const cargarArchivo = async (req = request, res = response) => {

    try {

        //const nombre = await subirArchivo(req.files)
        //const nombre = await subirArchivo(req.files, ['txt', 'md'])
        //const nombre = await subirArchivo(req.files, ['txt', 'md'] , 'textos')
        const nombre = await subirArchivo(req.files, undefined, 'img')

        res.json({ nombre })

    } catch (msg) {
        res.status(401).json({ msg })
    }
}


const actualizarImagen = async (req = request, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {

        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: 'El usuario no existe' });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: 'El producto no existe' });
            }
            break;

        default:
            return res.status(500).json({ msg: 'ocurrio un problema' });
    }

    if(modelo.img){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }
    
    const nombre = await subirArchivo(req.files, undefined, coleccion);

    modelo.img = nombre;
    await modelo.save();

    res.json( modelo )

}



const mostrarImagen = async (req = request, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {

        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: 'El usuario no existe' });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: 'El producto no existe' });
            }
            break;

        default:
            return res.status(500).json({ msg: 'ocurrio un problema' });
    }

    if(modelo.img){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen)
        }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile( pathImagen )

}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
}