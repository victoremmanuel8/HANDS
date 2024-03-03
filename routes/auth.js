const express = require('express');
const authControllerregister = require('../controllers/authregister');
const authControllerlogin = require('../controllers/authlogin');
const router = express.Router();

//aqui a função get e render vai pegar a url e renderizar ela no site
            'auth/cadastro'
router.post("/cadastro", authControllerregister.register) //teste

          'authlogin/login'
router.post("/login", authControllerlogin.login)

module.exports = router;