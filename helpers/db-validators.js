const role = require("../models/role");
const usuario = require("../models/usuario");

const esRolValido = async (rol = '') =>{
    const existe = await role.findOne({rol});
    if(!existe){
        throw new Error('El rol no existe');
    }
}


const emailExiste = async (correo = '') =>{

    const existeEmail = await usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error('El correo ya se encuentra registrado');
    }
}


const existeUsuarioPorId = async (id) =>{

    const existeUsuario = await usuario.findById(id );
    if (!existeUsuario) {
        throw new Error('El id no existe');
    }
}



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
}