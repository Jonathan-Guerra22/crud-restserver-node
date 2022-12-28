const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRolValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router()


router.get('/', usuariosGet);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y con mas de 6 caracteres').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    //check('rol', 'El rol no es valido').isIn(['ADMIN', 'USER_ROLE']),
    check('rol').custom( esRolValido),
    validarCampos
], usuariosPost);

router.put('/:id', usuariosPut);
router.delete('/', usuariosDelete)
router.patch('/', usuariosPatch)


module.exports = router;