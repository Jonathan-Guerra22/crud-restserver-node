const jwt = require('jsonwebtoken')


const generarJWT = ( uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn:'4h'
        }, (err, token) => {
            if(err){
                console.log("error jwt");
                console.log(err);
                reject('No se pudo crear el jwt')
            }else{
                resolve(token)
            }
        });

    });

};


module.exports = {
    generarJWT
}