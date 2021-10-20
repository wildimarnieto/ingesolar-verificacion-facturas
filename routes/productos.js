const {Router} = require('express');
const { check } = require('express-validator');
const { crearProducto,
        productosGet,
        productoGet,
        actualizarProducto,
        eliminarProducto
     } = require('../controllers/productos');
const { exiteCategoriaPorId, existeNombreP, existeProductoId, existeNombrePID } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();




// crear producto - privado- cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('disponible','disponible debe ser de tipo boolean').isBoolean(),
    check('categoria').custom(exiteCategoriaPorId),
    check('nombre').custom(existeNombreP),
    validarCampos


],crearProducto);

//obtener todos los productos cualquier persona
router.get('/',productosGet)

//obtener un producto por id 
router.get('/:id',[
    check('id', 'no es un ID valido..').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
],productoGet)

// actualizar producto por id (pendiente duplicado de nombre al actualizar)
router.put('/:id',[
    validarJWT,
    check('id', 'no es un ID valido..').isMongoId(),
    check('id').custom(existeProductoId),
    check('nombre').custom(existeNombreP),
    validarCampos

],actualizarProducto)

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'no es un ID valido..').isMongoId(),
    check('id').custom(existeProductoId),

    validarCampos

],eliminarProducto)


module.exports= router;