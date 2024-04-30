const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerConfig = require('../config/multer')
const fs = require('fs')
const path = require('path')
const ControllerUsuario= require('../controllers/consultaback')
const session = require("express-session")
const Post = require('../models/Post')
const cl_views = require('../models/View')


  //function do middleware (de sessão)
  function checkAuthenticated(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  //destroy da sessão (encerrar a sessão do usuário)
  router.get('/logout', function(req, res){
    req.session.destroy(function(err){
       if(err){
          console.log(err);
       } else {
          res.redirect('/');
       }
    });
 });
 

 //rota para visualizar todos os arquivos que estão no mongo DB em json
router.get('/posts', async (req, res) => {
  const posts = await Post.find();
    return res.json(posts);
});

//rota do multer para ver através do back
  router.post("/posts", multer(multerConfig).single('file'), async (req, res) =>{
    const { originalname: name, size, key, location: url= ''} = req.file;
    const { categoria, nivel } = req.body;

    const post = await Post.create({
      name,
      size,
      key,
      url,
      categoria,
      nivel,
    });
    console.log(req.file); 
    // return res.json(post);
    return res.redirect("/upload")
  });

//rota para visualizar os videos/imagens de acordo com a categoria e nivel do usuário
router.get('/upload/:categoria', async (req, res) => {
  const { categoria } = req.params;
  
  try {
      // Verifica se o usuário está autenticado
      if (!req.session.user) {
          return res.redirect('/'); 
      }
      
      // Obtém o nível do usuário da sessão do usuário
      const nv_usu = req.session.user.nm_nivel; 

      const files = await Post.find({ categoria });

      // Filtra os arquivos com base no nível do usuário
      const files_permitidos = files.filter(file => {
          if (nv_usu === 'Basico') {
              // Se o usuário for 'Basico', retorna apenas os arquivos 'Basico'
              return file.nivel === 'Basico';
          } else if (nv_usu === 'Intermediario') {
              // Se o usuário for 'Intermediário', retorna arquivos 'Basico' e 'Intermediário'
              return file.nivel === 'Basico' || file.nivel === 'Intermediario';
          } else {
              // Se o usuário for 'Avançado', retorna todos os arquivos
              return true;
          }
      });
      console.log('Nível do usuário:', nv_usu);
      
      // Renderiza o arquivo de modelo com os arquivos permitidos encontrados
      res.render('categoria', { file: files_permitidos }); 
  } catch (error) {
      console.error('Erro ao buscar arquivos:', error);
      res.status(500).send('Erro interno');
  }
});

router.post('/upload/:videoId/visualizado', async (req, res) => {
  const { videoId } = req.params;
  const userId = req.session.id;

  try {
      // Verifica se o usuário já assistiu ao vídeo anteriormente
      const video_view = await cl_views.findOne({ videoId, userId });

      if (video_view) {
          console.log('Este vídeo já foi assistido pelo usuário anteriormente.');
             return res.render('categoria', { assistido: true });
      }

      // Cria um novo registro na coleção de vídeos assistidos
      const new_video_view = new cl_views({
          videoId,
          userId
      });

      await new_video_view.save();

      console.log('Vídeo assistido registrado com sucesso.');
      
      return res.render('categoria', { assistido: true });
  } catch (error) {
      console.error('Erro ao registrar vídeo assistido:', error);
      res.status(500).send('Erro interno');
  }
});

//rota para deletar os posts com base no id do arquivo
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
  res.render("kids"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/profissionais", checkAuthenticated, (req, res) => {
  res.render("profissionais"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
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

  router.get("/termos-uso",(req, res) => {
       res.render("termos-uso"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
          
        });
        
  router.get("/pesquisa", (req, res) => {
    res.render("pesquisa"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).

     });

     router.get("/redef_senha", checkAuthenticated, (req,res) => {
      res.render('redef_senha');
    });
  
     router.get("/perfil", checkAuthenticated,(req, res) => {
        if(req.session.user) {
          res.render('perfil', { user: req.session.user });
        }
    }); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).

    router.get("/upload", checkAuthenticated, (req, res) => {
      res.render('upload')
    })

    router.get('/categoria', checkAuthenticated, (req,res) => {
      res.render('categoria')
    })

   // Rota para servir os vídeos e demonstrar (para fins de teste. Não vai ser utilizado)
router.get('/videos/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '..', '..', 'tmp', 'uploads', filename);

  // Verifica se o arquivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(err);
      return res.status(404).send('Arquivo não encontrado');
    }

    // Se o arquivo existir, envia-o como resposta
    res.sendFile(filePath);
  });
});
module.exports = router;

  // filtro para encontrar as categorias especificas
//   router.get('/upload/:categoria', checkAuthenticated, async (req, res) => {
//     const { categoria } = req.params;

//     try {
//         // Consulta no banco de dados MongoDB para recuperar os arquivos da categoria especificada
//         const file = await Post.find({ categoria });

//         // Renderiza o arquivo de modelo com os arquivos encontrados
//         res.render('categoria', { file }); // Supondo que o arquivo de modelo se chame 'index.hbs' e está na pasta 'views'
//     } catch (error) {
//         console.error('Erro ao buscar arquivos:', error);
//         res.status(500).send('Erro interno');
//     }
// });


// router.post('/video/:videoId/visualizado', async (req, res) => {
//   const { videoId } = req.params;
//   const userId = req.session.id; 

//   try {
//       // Verifique se o usuário já assistiu ao vídeo anteriormente
//       const video_view = await cl_views.findOne({ videoId, userId });

//       if (!video_view) {
//           // Crie um novo registro na coleção de vídeos assistidos
//           const new_video_view = new cl_views({
//               videoId,
//               userId
//           });
//           await new_video_view.save();
//       }

//       res.sendStatus(200); // Responda com sucesso
//   } catch (error) {
//       console.error('Erro ao registrar visualização do vídeo:', error);
//       res.status(500).send('Erro interno');
//   }
// });
