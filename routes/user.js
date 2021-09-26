const { Router } = require('express');
const { usuarioGet, ususarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require('../controllers/user');

const router = Router();


router.get('/', usuarioGet)

router.put('/:id', ususarioPut)

router.post('/', usuarioPost)

router.delete('/', usuarioDelete)

router.patch('/', usuarioPatch)




module.exports = router;