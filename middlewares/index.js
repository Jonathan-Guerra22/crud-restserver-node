const validarCampos = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJWT');
const validarRoles = require('../middlewares/validarRoles');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
}