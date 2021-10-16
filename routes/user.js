const { Router } = require('express');
const { usuarioGet, ususarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');

const { check } = require('express-validator');
const { esRoleValido, emailExiste, exiteUsuarioPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', usuarioGet)

router.put('/:id',[
    check('id', 'no es un ID valido..').isMongoId(),
    check('id').custom(exiteUsuarioPorId),
    check('rol').custom(esRoleValido),

    validarCampos

], ususarioPut)


router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio y mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'el rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos

], usuarioPost)

router.delete('/:id',[
    check('id', 'no es un ID valido..').isMongoId(),
    check('id').custom(exiteUsuarioPorId),

    validarCampos

],
 usuarioDelete)

router.patch('/', usuarioPatch)




module.exports = router;