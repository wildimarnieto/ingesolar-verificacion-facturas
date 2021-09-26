const { response, request } = require('express');

const usuarioGet = (req = request, res = response) => {

    const { nombre, edad = 28 } = req.query;

    res.json({

        ok: true,
        msg: 'get API - controlador',
        nombre,
        edad
    })
}


const ususarioPut = (req, res = response) => {

    const id = req.params.id;
    res.json({

        ok: true,
        msg: 'put API - controlador',
        id
    })
}

const usuarioPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({

        ok: true,
        msg: 'post API- controlador',
        nombre,
        edad

    })
}

const usuarioDelete = (req, res = response) => {
    res.json({

        ok: true,
        msg: 'delete API-- controlador'

    })
}

const usuarioPatch = (req, res = response) => {
    res.json({

        ok: true,
        msg: 'patch API-- controlador'

    })
}


module.exports = {
    usuarioGet,
    ususarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch

}