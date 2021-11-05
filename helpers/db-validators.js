const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');
//rol es valido
const esRoleValido = async(rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD..`);
    }

}
// existe email
const emailExiste = async(correo = '') => {

    const existEmail = await Usuario.findOne({ correo });
    if (existEmail) {
        throw new Error(`El correo ${correo} ya esta registrado en la BD..`);

    }
}
// existe usuario por id
const exiteUsuarioPorId = async(id ) => {

    const existId = await Usuario.findById(id );
    if (!existId||!existId.estao) {
        throw new Error(`El ID: ${id} no existe en la BD...`);

    }
}
// existe categoria por id
const exiteCategoriaPorId = async(id ) => {

    const existId = await Categoria.findById(id);
    if (!existId||!existId.estado) {
        throw new Error(`El ID: ${id} no existe en la BD...`);

    }
}
//existe categoria por nombre 
const exiteNombreC = async(nombre ) => {

    const existNombre = await Categoria.findOne({nombre:nombre.toUpperCase()});
    
    if (existNombre) {
        throw new Error(`la categoria: ${nombre} ya existe en la BD...`);

    }
}

//existe nombre de producto
const existeNombreP = async(nombre ) => {
    
    const existNombre = await Producto.findOne({nombre:nombre.toUpperCase()});
       
    if (existNombre) {
            throw new Error(`El producto: ${nombre} ya existe en la BD...`);

     }
    
    
}

// existe producto por id 
const existeProductoId =async(id)=>{

    const existeProducto = await Producto.findById(id);
    if (!existeProducto||!existeProductoId.estado) {
        
        throw new Error(`El id: ${id} no existe en la BD...`);
    }
}

//validar colecciones permitidas

const coleccionesPermitidas = (coleccion ='', colecciones = [])=>{

    const incluida = colecciones.includes(coleccion);

    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`)
        
    }
    return true;

}





module.exports = {
    esRoleValido,
    emailExiste,
    exiteUsuarioPorId,
    exiteCategoriaPorId,
    exiteNombreC,
    existeNombreP,
    existeProductoId,
    coleccionesPermitidas
    

}