const express = require('express')

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();  
    }
    middlewares() {
        this.server.use(express.json());
    }
    routes() {

    }
}

module.exports = new App().server;