  const express = require('express');
  const db = require('../../app');
  const router = express.Router();
  const multer = require('multer');
  const multerConfig = require('../config/multer');
  const fs = require('fs');
  const path = require('path');
  const ControllerUsuario = require('../controllers/consultaback');
  const {tb_usuario} = require('../models/usu_model')
  const moment = require('moment');

  router.use(express.json());

  // Middleware para calcular o tempo de sessão
  async function calculateSessionTime(req, res, next) {
    if (req.session.user) {
      try {
        // Recuperar o tempo de sessão armazenado no banco de dados
        const user = await tb_usuario.findByPk(req.session.user.id_usuario);
        const previousSessionTime = user ? user.sessionTime : '00:00:00';
  
        // Obter o tempo decorrido desde o último acesso
        const currentTime = new Date().getTime();
        const startTime = req.cookies.startTime || currentTime;
        const elapsedTime = currentTime - startTime;
        const formattedElapsedTime = convertMillisecondsToTime(elapsedTime);
  
        // Somar o tempo decorrido com o tempo anterior
        const formattedTime = sumTimes(previousSessionTime, formattedElapsedTime);
  
        // Atualizar o tempo de sessão no banco de dados
        await updateUserSessionTime(req.session.user.id_usuario, formattedTime);
  
        // Configurar cookies e sessão
        res.cookie(`sessionTime_${req.session.user.id_usuario}`, formattedTime, { maxAge: elapsedTime, httpOnly: true });
        res.cookie('startTime', currentTime, { httpOnly: true });
        req.session.formattedSessionTime = formattedTime;
      } catch (error) {
        console.error('Erro ao calcular o tempo de sessão:', error);
      }
    }
    next();
  }
  
  // Função para somar dois tempos no formato HH:MM:SS
  function sumTimes(time1, time2) {
    const [hours1, minutes1, seconds1] = time1.split(':').map(Number);
    const [hours2, minutes2, seconds2] = time2.split(':').map(Number);
  
    let totalSeconds = seconds1 + seconds2;
    let totalMinutes = minutes1 + minutes2;
    let totalHours = hours1 + hours2;
  
    // Ajustar os minutos e segundos se forem maiores que 60
    if (totalSeconds >= 60) {
      totalSeconds -= 60;
      totalMinutes++;
    }
    if (totalMinutes >= 60) {
      totalMinutes -= 60;
      totalHours++;
    }
  
    // Formatar o resultado
    const formattedHours = totalHours.toString().padStart(2, '0');
    const formattedMinutes = totalMinutes.toString().padStart(2, '0');
    const formattedSeconds = totalSeconds.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  
  // Função para converter milissegundos em HH:MM:SS
  function convertMillisecondsToTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  // Função para atualizar o tempo de sessão do usuário no banco de dados
  async function updateUserSessionTime(userId, sessionTime) {
    // Atualize o tempo de sessão do usuário no banco de dados
    await tb_usuario.update({ sessionTime }, { where: { id_usuario: userId } });
  }
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  //function do middleware (de sessão do usuario)
  function checkAuthenticated(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  } 

  //function do middleware (de sessão do prof)
  function checkAuthenticated_Prof(req, res, next) {
    if (req.session.user) {
      if (req.session.user.nm_nivel === "Avancado") {
        return next();
      } else {
        // Redirecionar usuários que não são "Avancado" para outra página
        res.redirect('/index');
      }
    } else {
      res.redirect('/');
    }
  }

  //destroy da sessão (encerrar a sessão do usuário)
  router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('sessionTime');
        res.clearCookie('startTime');
        res.redirect('/');
      }
    });
  });

  //rotas do back para o insomnia
  router.get('/usuario', ControllerUsuario.getAllusuarios);
  router.put('/usuario/id/:id_usuario', ControllerUsuario.editusuarioById);
  router.post('/usuario/criar', ControllerUsuario.createNewusuario);
  router.delete('/usuario/:id_usuario', ControllerUsuario.deleteusuarioById);

  router.get("/pesquisa/:nm_usuario", ControllerUsuario.getUsuarioByName);

  //rota para visualizar todos os arquivos que estão no mongo DB em json
  router.get('/posts', async(req, res) => {
    const posts = await Post.find();
    return res.json(posts);
  });

  //rota do multer para ver através do back
  router.post("/posts", multer(multerConfig).single('file'), async(req, res) => {
    const { originalname: name, size, key, location: url = '' } = req.file;
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
    return res.redirect("/upload");
  });

  //rota para visualizar os videos/imagens de acordo com a categoria e nivel do usuário
  router.get('/upload/:categoria', async(req, res) => {
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

  router.post('/upload/:videoId/visualizado', async(req, res) => {
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
  router.delete('/posts/:id', async(req, res) => {
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

  //aqui a função get e render vai pegar a url e renderizar ela no site

  // a pagina inicial que irá aparecer ao entrar no server
  router.get("/", (req, res) => {
    const formData = req.session.formData || {};
    req.session.formData = null; // Limpe os dados do formulário da sessão
    res.render('login', { formData: formData }); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
  });

  router.get("/login_prof", (req, res) => {
    res.render("login_prof"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).

  });


  // Rota que requer autenticação
  router.get('/index', checkAuthenticated, calculateSessionTime, /*verificaAutenticacao,*/ (req, res) => {
    res.render('index');
  });

  router.get("/kids", checkAuthenticated, (req, res) => {
    if (req.session.user) {
      res.render('kids', { user: req.session.user });
    }
  });

  router.get("/profissionais", checkAuthenticated, (req, res) => {
    res.render("profissionais"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
  });

  router.get("/cadastro", (req, res) => {
    const formData = req.session.formData || {};
    req.session.formData = null; // Limpe os dados do formulário da sessão
    res.render('cadastro', { formData: formData }); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
  });

  router.get("/cadastro1", (req, res) => {
    res.render("cadastro1"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).

  });

  router.get("/delete", checkAuthenticated, (req, res) => {
    res.render("delete")
  })

  router.get("/cadastro_prof", (req, res) => {
    res.render("cadastro_prof"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).

  });

  router.get("/cat-num", checkAuthenticated, (req, res) => {
    res.render("cat-num"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).

  });

  router.get("/aulas", checkAuthenticated, calculateSessionTime, (req, res) => {
    if (req.session.user) {
      res.render('aulas', {
        user: req.session.user,
        formattedSessionTime: req.session.formattedSessionTime 
      });
    }
  });
    //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).

  router.get("/header", checkAuthenticated, (req, res) => {
    res.render("header"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).

  });

  router.get("/termos-uso", (req, res) => {
    res.render("termos-uso"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).

  });

  router.get("/atividades", checkAuthenticated, (req, res) => {
    res.render("atividades"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).

  });

  router.get("/pesquisa", (req, res) => {
    res.render("pesquisa"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).

  });

  router.get("/perfil", checkAuthenticated, (req, res) => {
    if (req.session.user) {
      res.render('perfil', { user: req.session.user });
    }
  }); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).

  router.get("/upload", checkAuthenticated_Prof, (req, res) => {
    res.render('upload')
  })

  router.get('/categoria', checkAuthenticated, (req, res) => {
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