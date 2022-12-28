const role = require("../models/role");

const esRolValido = async (rol = '') =>{
    const existe = await role.findOne({rol});
    if(!existe){
        throw new Error('El rol no existe');
    }
}


module.exports = {
    esRolValido,
}