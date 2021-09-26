const express = require('express')
const cors = require('cors');

class server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariospath = '/api/usuarios';


        // Middlewares
        this.middlewares();

        // rutas de mi app
        this.routes();
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

        this.app.use(this.usuariospath, require('../routes/user'));




    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto =D', this.port);
        });

    }

}



module.exports = server;