const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProducto, obtenerProductos, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const {
    validarCampos,
    validarJWT,
    adminRol,
} = require('../middlewares');

const router = Router()


router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', ['El id es obligatorio']).not().isEmpty(),
    check('id', ['No es un id valido']).isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El categotia es obligatoria').not().isEmpty(),
    check('categoria', 'El id de la categoria no es valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
], crearProducto);


router.put('/:id', [
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], actualizarProducto);


router.delete('/:id', [
    validarJWT,
    adminRol,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], eliminarProducto);

module.exports = router;