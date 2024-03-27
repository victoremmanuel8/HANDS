const express = require('express');
const router = express.Router();
const ControllerUsuario= require('../controllers/consultaback')
const verificaAutenticacao = require('../middleware/Auth')


//rotas do back para o insomnia
router.get('/usuario', ControllerUsuario.getAllusuarios)
router.put('/usuario/id/:id_usuario', ControllerUsuario.editusuarioById)
router.post('/usuario/criar', ControllerUsuario.createNewusuario)
router.delete('/usuario/:id_usuario', ControllerUsuario.deleteusuarioById)

//aqui a função get e render vai pegar a url e renderizar ela no site

// a pagina inicial que irá aparecer ao entrar no server
router.get("/", (req, res) => {
  
  res.render("login"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/login_prof", (req, res) => {
  res.render("login_prof"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
  
  });

// Rota que requer autenticação
router.get('/index', /*verificaAutenticacao,*/ (req, res) => {
  res.render('index');
});

router.get("/kids", (req, res) => {
  //res.send("<h1>Pagina-Inicial</h1>")
  res.render("kids"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/profissionais", (req, res) => {
  //res.send("<h1>Pagina-Inicial</h1>")
  res.render("profissionais"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

//area de teste para usuarios
router.get("/teste", (req, res) => {
  res.render("teste"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/cadastro", (req, res) => {
 res.render("cadastro"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
 
 });

 router.get("/cadastro_prof", (req, res) => {
  res.render("cadastro_prof"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
  
  });

  router.get("/cat-num", (req, res) => {
    res.render("cat-num"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
    
    });

  router.get("/aulas", (req, res) => {
      res.render("aulas"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
      
      });

  router.get("/header", (req, res) => {
      res.render("header"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
        
      });

module.exports = router;