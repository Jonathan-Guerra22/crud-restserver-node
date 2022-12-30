const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');

const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary, mostrarImagenCloudinary, cargarArchivoCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoSubir } = require('../middlewares');


const router = Router();


//router.post( '/', validarArchivoSubir, cargarArchivo)
router.post( '/', validarArchivoSubir, cargarArchivoCloudinary)

router.put( '/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
], actualizarImagenCloudinary)
//], actualizarImagen)

router.get( '/:coleccion/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
], mostrarImagenCloudinary)
//], mostrarImagen)

module.exports = router