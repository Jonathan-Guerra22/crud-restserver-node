const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }


    try{
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET_KEY)
        
        const usuarioAutenticado = await Usuario.findById(uid)

        if (!usuarioAutenticado){
            return res.status(401).json({
                msg:'Token no valido'
            });
        }

        if( !usuarioAutenticado.status ){
            return res.status(401).json({
                msg:'Token no valido'
            });
        }

        req.usuario = usuarioAutenticado;

        next();

    }catch(error){

        console.log("error validando jwt");
        console.log(error);
        
        res.json({
            msg:'token no valido'
        });
    };

};

module.exports = {
    validarJWT,
}