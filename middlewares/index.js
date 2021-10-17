
const validarCAmpos = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');


module.exports ={
    ...validarCAmpos,
    ...validarJWT,
    ...validaRoles

}