const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD..`);
    }

}

const emailExiste = async(correo = '') => {

    const existEmail = await Usuario.findOne({ correo });
    if (existEmail) {
        throw new Error(`El correo ${correo} ya esta registrado en la BD..`);

    }
}

const exiteUsuarioPorId = async(id ) => {

    const existId = await Usuario.findById(id );
    if (!existId) {
        throw new Error(`El ID: ${id} no existe en la BD...`);

    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    exiteUsuarioPorId

}