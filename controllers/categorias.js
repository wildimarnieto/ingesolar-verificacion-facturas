const { response, request } = require("express");
const {Categoria } = require('../models');
const usuario = require("../models/usuario");


// obtener Categorias - paginado- total - populate
const categoriasGet = async(req = request, res = response) => {

    
    const {limite=5, desde=0} = req.query;
    const query = {estado:true };
    
    
    const [total, categoria] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario','nombre')
        .skip(Number(desde))
        .limit(Number(limite))


    ])
    
    res.json({
       total,
       categoria
       
    });
}

// opbtener Categoria- populate
const categoriaGet = async(req=request, res=response)=>{


    const id = req.params.id;
    categoria = await Categoria.findById(id).populate('usuario','nombre');
   
    
    res.json(categoria);
 
}
// crear categoria
const crearCategoria = async(req, res= response) =>{

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});
    if (categoriaDB) {
        return res.status(400).json({
            msg:`la categoria ${categoriaDB.nombre}, ya existe `

        });
    }

    // Generar la data a guardar 

    const data ={

        nombre,
        usuario: req.usuario._id

    }

    const categoria = new Categoria(data);
    //guardar DB
    await categoria.save(); 

    res.status(201).json(categoria);



}
// Actualizar categoria
const actuaCategoria = async(req= request, res= response)=>{

    const id = req.params.id;
    const nombre = req.body.nombre.toUpperCase();
    const usuario = req.usuario._id;
    const data ={
        nombre:nombre,
        usuario:usuario            
    }
    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});
    res.json(categoria);

}
// borrar categoria
const borrarCategoria= async(req= request, res=response)=>{
    const id = req.params.id;
   const usuario = req.usuario._id;
    const data ={
        estado:false,
        usuario:usuario            
    }
    const categoria = await Categoria.findByIdAndUpdate(id,data);
    res.json(categoria);


}

module.exports={
    crearCategoria,
    categoriasGet,
    categoriaGet,
    actuaCategoria,
    borrarCategoria
}