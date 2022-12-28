const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {
    validarCampos,
    validarJWT,
    adminRol,
    tieneRol,
 } = require('../middlewares');


const router = Router()


router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y con mas de 6 caracteres').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'El rol no es valido').isIn(['ADMIN', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    validarJWT,
    //adminRol,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)


module.exports = router;