const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariospath = '/api/usuarios';
        this.authpath     ='/api/auth';
        this.categoriaspath  ='/api/categorias';
        this.productospath  ='/api/productos';


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
    }

    routes() {

        this.app.use(this.authpath, require('../routes/auth'));
        this.app.use(this.usuariospath, require('../routes/user'));
        this.app.use(this.categoriaspath, require('../routes/categorias'));
        this.app.use(this.productospath, require('../routes/productos'));
        



    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto =D', this.port);
        });

    }

}



module.exports = server;