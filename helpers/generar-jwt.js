const jwt = require('jsonwebtoken');

const generarJWT = (uid='') =>{

    return new Promise((resolv, reject)=>{

        const payload = {uid};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {

            expiresIn: '4h'

        },(err, token )=>{

            if (err) {
                console.log(err);
                reject('no se pudo generar el token ')
            }else {
                resolv(token);
            }
        } )




    })


}



module.exports = {

    generarJWT

}