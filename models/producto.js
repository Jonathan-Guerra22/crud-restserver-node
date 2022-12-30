const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    precio:{
        type: Number,
        default: 0,
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },
    desc:{
        type:String,
    },
    disponible:{
        type:Boolean,
        require: true
    },
    img:{
        type:String,
    }
});

ProductoSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}


module.exports = model('Procucto', ProductoSchema)