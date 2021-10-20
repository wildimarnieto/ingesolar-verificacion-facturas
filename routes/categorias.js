const { Router } = require('express');
const { check } = require('express-validator');
const {login, googleSing} = require ('../controllers/auth');
const { crearCategoria, categoriasGet, categoriaGet, actuaCategoria, borrarCategoria } = require('../controllers/categorias');
const { exiteCategoriaPorId, exiteNombreC } = require('../helpers/db-validators');
const { validarJWT, validarCampos, tieneRole } = require('../middlewares');


const router = Router();

/* {{url}}/api/categorias */
// obtener todas las categorias - publico
router.get('/', categoriasGet );

// obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'no es un ID valido..').isMongoId(),
    check('id').custom(exiteCategoriaPorId),
    validarCampos
], categoriaGet );

// crear categoria - privado- cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validarCampos


], crearCategoria);

// actualizar una categoria - privado- cualquier persona con un token valido
router.put('/:id',[
    validarJWT,
    check('id', 'no es un ID valido..').isMongoId(),
    check('id').custom(exiteCategoriaPorId),
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(exiteNombreC),
   
    validarCampos

], actuaCategoria );

// borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'no es un ID valido..').isMongoId(),
    check('id').custom(exiteCategoriaPorId),
   validarCampos



], borrarCategoria);




module.exports= router;
