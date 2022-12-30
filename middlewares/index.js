const validarArchivo = require('../middlewares/validarArchivo');
const validarCampos = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJWT');
const validarRoles = require('../middlewares/validarRoles');


module.exports = {
    ...validarArchivo,
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
}