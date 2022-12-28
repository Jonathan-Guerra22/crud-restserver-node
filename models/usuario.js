const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        requiered: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        requiered: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        requiered: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        requiered: [true, 'El rol es obligatorio'],
        enum: ['ADMIN', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});


module.exports = model('Usuario', UsuarioSchema)