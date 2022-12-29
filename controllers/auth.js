const { request, response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/googleVerify');



const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / contraseña no son validos'
            })
        }

        if (!usuario.status) {
            return res.status(400).json({
                msg: 'Usuario / contraseña no son validos'
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / contraseña no son validos'
            })
        }


        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })


    } catch (error) {

        console.log("error");
        console.log(error);

        return res.status(500).json({
            msg: 'Ocurrio un problema'
        })
    }
};



const googleSignIn = async (req = request, res = response) => {

    const { id_token } = req.body;


    try {

        const { nombre, img, correo } = await googleVerify(id_token)

        let usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: '*****',
                img,
                gooogle: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.status) {
            return res.status(401).json({
                msg: 'Contacte soporte'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'ok',
            token,
            usuario,
        });


    } catch (error) {

        console.log("error");
        console.log(error);

        return res.status(400).json({
            msg: 'El token no se pudo validar'
        })
    }
};


module.exports = {
    login,
    googleSignIn,
}