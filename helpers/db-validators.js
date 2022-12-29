const { Categoria, Role, Usuario } = require("../models");

const esRolValido = async (rol = '') => {
    const existe = await Role.findOne({ rol });
    if (!existe) {
        throw new Error('El rol no existe');
    }
}


const emailExiste = async (correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error('El correo ya se encuentra registrado');
    }
}


const existeUsuarioPorId = async (id) => {

    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error('El id no existe');
    }
}

const existeCategoriaPorId = async (id) => {

    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error('El id no existe');
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
}