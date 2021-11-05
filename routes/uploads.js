const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen, mostrarImagen, actualizarImagenCloudinary }=require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivoS, validarCampos } = require('../middlewares');


const router = Router();

router.post('/',validarArchivoS, cargarArchivos);

router.put('/:coleccion/:id',[
    validarArchivoS,
    check('id','el id no es valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos 

], actualizarImagenCloudinary);
//], actualizarImagen);

router.get('/:coleccion/:id',[],mostrarImagen)




module.exports= router;
