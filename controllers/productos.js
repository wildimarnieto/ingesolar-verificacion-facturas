const { request, response } = require("express");
const { Producto } = require("../models");
const producto = require("../models/producto");
const { estimatedDocumentCount } = require("../models/producto");
const { param } = require("../routes/auth");

// crear producto
const crearProducto = async(req=request,res=response)=>{

   const {estado, usuario, nombre, ...data} = req.body;

   data.usuario= req.usuario._id;
   data.nombre = nombre.toUpperCase();
  
    const producto = new Producto(data);
    // guaradar en DB
    await producto.save();

res.json(producto);

}
//obtener todos los productos
const productosGet = async(req=request, res=response)=>{

    const {limite=5, desde=0} = req.query;
    const query = {estado:true };
    
    
    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .skip(Number(desde))
        .limit(Number(limite))


    ])
    
    res.json({
       total,
       producto
       
    });

}
// obtener un producto por id
const productoGet = async (req=request, res=response)=>{

    const id = req.params.id;

    const producto = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre');

    res.json(producto);
}
//actualizar productos por id
const actualizarProducto = async(req=request, res=response)=>{

    const id = req.params.id;
    const {estado,usuario,nombre,   ...data}= req.body;
    if (nombre!==null) {
        data.nombre = nombre.toUpperCase();    
    }
    
    data.usuario=req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});

    res.json(producto);
}
// eliminar producto
const eliminarProducto = async(req=request, res=response)=>{

    const id = req.params.id;
    const data ={
        estado:false,
        usuario:req.usuario.id
    }
    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});
    res.json(producto);

}



module.exports={
    crearProducto,
    productosGet,
    productoGet,
    actualizarProducto,
    eliminarProducto


}