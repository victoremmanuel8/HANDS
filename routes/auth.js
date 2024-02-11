const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

//aqui a função get e render vai pegar a url e renderizar ela no site
            'auth/teste'
router.post("/teste", authController.register) //teste

module.exports = router;