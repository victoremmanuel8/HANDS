const express = require('express');
const req = require("../../node_modules/req/node_modules/mime");
const router = express.Router();
const authControllerregister = require('../controllers/authregister');
const authControllerlogin = require('../controllers/authlogin');
const authControllerprof = require('../controllers/authregister_prof');
const authControllerlogprof = require('../controllers/authlogin_prof');


//aqui a função get e render vai pegar a url e renderizar ela no site
            'auth/cadastro'
router.post("/cadastro", authControllerregister.register) //teste

                'auth/cadastro_prof'
router.post("/cadastro_prof", authControllerprof.register)

'authlogin/login_prof'
router.post("/login_prof", authControllerlogprof.login)

                'auth/login'
router.post("/login", (req, res) => {
    const { email, senha } = req.body; 
  
    const erros = [];
  
    if (!email || typeof email === 'undefined' || email === null) {
        erros.push({ text: "Email Inválido" });
    }
  
    if (!senha || typeof senha === 'undefined' || senha === null) {
        erros.push({ text: "Senha inválida" });
    } else if (senha.length < 3) {
        erros.push({ text: "Senha da categoria muito pequena" });
    }
  
    if (erros.length > 0) {
        res.render("login", { erros: erros });
    } else {
      authControllerlogin.login(req, res);
    }
  });


module.exports = router;