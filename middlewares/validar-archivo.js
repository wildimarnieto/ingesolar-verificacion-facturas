const { response } = require("express");

    
   const validarArchivoS = (req, res=response, next)=>{ 
    
    
    if (!req.files || Object.keys(req.files).length === 0||!req.files.archivo) {
        res.status(400).json({
            msg:'No hay archivos que subir--- Validar archivo subir.'});
        return;
      }

      next();

    }





module.exports={
    validarArchivoS
}