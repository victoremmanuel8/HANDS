const express = require('express');
const router = express.Router();
const multer = require('multer')
const multerConfig = require('../config/multer')
const ControllerUsuario= require('../controllers/consultaback')
const session = require("express-session")
const Post = require('../models/Post')

router.get('/posts', async (req, res) => {
  const posts = await Post.find();
    return res.json(posts);
});
//rota do multer para ver através do back
router.post("/posts", multer(multerConfig).single('file'), async (req, res) =>{
  const { originalname: name, size, key, location: url= ''} = req.file;
  const post = await Post.create({
    name,
    size,
    key,
    url
  });
  /*console.log(req.file); */
  return res.json(post);
});


router.delete('/posts/:id', async (req, res) => {
  try {
      const post = await Post.findOneAndDelete({ _id: req.params.id });
      if (!post) {
          return res.status(404).send({ error: 'Post não encontrado' });
      }

      return res.status(200).send({ message: 'Post deletado com sucesso' });
  } catch (error) {
      console.error('Error deleting post:', error);
      return res.status(500).send({ error: 'Erro interno' });
  }
});


//rotas do back para o insomnia
router.get('/usuario', ControllerUsuario.getAllusuarios)
router.put('/usuario/id/:id_usuario', ControllerUsuario.editusuarioById)
router.post('/usuario/criar', ControllerUsuario.createNewusuario)
router.delete('/usuario/:id_usuario', ControllerUsuario.deleteusuarioById)

router.get("/pesquisa/:nm_usuario", ControllerUsuario.getUsuarioByName);

  //function do middleware
  function checkAuthenticated(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  //destroy da sessão
  router.get('/logout', function(req, res){
    req.session.destroy(function(err){
       if(err){
          console.log(err);
       } else {
          res.redirect('/');
       }
    });
 });
 
  
//aqui a função get e render vai pegar a url e renderizar ela no site

// a pagina inicial que irá aparecer ao entrar no server
router.get("/",  (req, res) => {
  
  res.render("login"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/login_prof", (req, res) => {
  res.render("login_prof"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
  
  });


// Rota que requer autenticação
router.get('/index', checkAuthenticated,/*verificaAutenticacao,*/ (req, res) => {
  res.render('index');
});

router.get("/kids", checkAuthenticated, (req, res) => {
  //res.send("<h1>Pagina-Inicial</h1>")
  res.render("kids"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/profissionais", checkAuthenticated, (req, res) => {
  //res.send("<h1>Pagina-Inicial</h1>")
  res.render("profissionais"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

//area de teste para usuarios
router.get("/teste", checkAuthenticated,(req, res) => {
  res.render("teste"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/cadastro", (req, res) => {
 res.render("cadastro"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
 
 });

 router.get("/cadastro_prof",  (req, res) => {
  res.render("cadastro_prof"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
  
  });

  router.get("/cat-num", checkAuthenticated,(req, res) => {
    res.render("cat-num"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
    
    });

  router.get("/aulas", checkAuthenticated,(req, res) => {
      res.render("aulas"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
      
      });

  router.get("/header", checkAuthenticated,(req, res) => {
      res.render("header"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
        
      });

  router.get("/termos-uso", checkAuthenticated,(req, res) => {
       res.render("termos-uso"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
          
        });
        
  router.get("/pesquisa", (req, res) => {
    res.render("pesquisa"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
       
     });
  
     router.get("/perfil", checkAuthenticated,(req, res) => {
        if(req.session.user) {
          res.render('perfil', { user: req.session.user });
        }
    }); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
         


module.exports = router;