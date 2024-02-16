const express = require('express');
const router = express.Router();

//aqui a função get e render vai pegar a url e renderizar ela no site

// a pagina inicial que irá aparecer ao entrar no server
router.get("/", (req, res) => {
  res.render("index"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/index", (req, res) => {
  //res.send("<h1>Pagina-Inicial</h1>")
  res.render("index"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/aulas", (req, res) => {
  //res.send("<h1>Pagina-Inicial</h1>")
  res.render("aulas"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
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

module.exports = router;