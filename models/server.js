const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariospath = '/api/usuarios';
        this.authpath     ='/api/auth';
        this.categoriaspath  ='/api/categorias';
        this.productospath  ='/api/productos';
        this.buscarpath  ='/api/buscar';
        this.uploadspath  ='/api/uploads';
        


        // conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();

    }

    middlewares() {

        // CORS 
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json());
        // directorio publico
        this.app.use(express.static('public'));
        // carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {

        this.app.use(this.authpath, require('../routes/auth'));
        this.app.use(this.usuariospath, require('../routes/user'));
        this.app.use(this.categoriaspath, require('../routes/categorias'));
        this.app.use(this.productospath, require('../routes/productos'));
        this.app.use(this.buscarpath, require('../routes/buscar'));
        this.app.use(this.uploadspath, require('../routes/uploads'));
        



    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto =D', this.port);
        });

    }

}



module.exports = server;