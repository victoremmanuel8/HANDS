const express = require('express');
const router = express.Router();
// const session = require("express-session")




  //function do middleware

  // function checkAuthenticated(req, res, next) {
  //   if (req.session.user) {
  //     next();
  //   } else {
  //     res.redirect('/');
  //   }
  // }
  
//aqui a função get e render vai pegar a url e renderizar ela no site

// a pagina inicial que irá aparecer ao entrar no server
router.get("/login",  (req, res) => {
  
  res.render("login"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/login_prof", (req, res) => {
  res.render("login_prof"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
  
  });

// Rota que requer autenticação
router.get('/', /*verificaAutenticacao,*/ (req, res) => {
  res.render('index');
});

router.get("/", (req, res) => {
  //res.send("<h1>Pagina-Inicial</h1>")
  res.render("kids"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/", (req, res) => {
  //res.send("<h1>Pagina-Inicial</h1>")
  res.render("profissionais"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

//area de teste para usuarios
router.get("/",(req, res) => {
  res.render("teste"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/", (req, res) => {
 res.render("cadastro"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
 
 });

 router.get("/cadastro_prof",  (req, res) => {
  res.render("cadastro_prof"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
  
  });

  router.get("/",(req, res) => {
    res.render("cat-num"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
    
    });

  router.get("/",(req, res) => {
      res.render("aulas"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
      
      });

  router.get("/",(req, res) => {
       res.render("termos-uso"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
          
        });
  

module.exports = router;