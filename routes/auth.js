const express = require('express');
const authControllerregister = require('../controllers/authregister');
const authControllerlogin = require('../controllers/authlogin');
const authControllerprof = require('../controllers/authregister_prof');
const authControllerlogprof = require('../controllers/authlogin_prof');
const router = express.Router();

//aqui a função get e render vai pegar a url e renderizar ela no site
            'auth/cadastro'
router.post("/cadastro", authControllerregister.register) //teste

                'auth/cadastro_prof'
router.post("/cadastro_prof", authControllerprof.register)

'authlogin/login_prof'
router.post("/login_prof", authControllerlogprof.login)

          'authlogin/login'
router.post("/login", authControllerlogin.login)




module.exports = router;