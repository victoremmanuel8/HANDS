const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const ControllerUsuario = require("../controllers/consultaback");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const cl_views = require("../models/View");
const { tb_usuario } = require("../models/usu_model");
const uploadMiddleware = require("../../middleware/photo_multer");
// const moment = require('moment');

router.use(express.json());

//function do middleware (de sessão do usuario)
function checkAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
}

//function do middleware (de sessão do prof)
function checkAuthenticated_Prof(req, res, next) {
  if (req.session.user) {
    if (req.session.user.nm_nivel === "Avancado") {
      return next();
    } else {
      // Redirecionar usuários que não são "Avancado" para outra página
      res.redirect("/index");
    }
  } else {
    res.redirect("/");
  }
}

//destroy da sessão (encerrar a sessão do usuário)
router.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.clearCookie("sessionTime");
      res.clearCookie("start_time");
      res.redirect("/");
    }
  });
});

// Middleware para calcular o tempo de sessão
async function calcul_time(req, res, next) {
  if (req.session.user) {
    try {
      const user = await tb_usuario.findByPk(req.session.user.id_usuario);

      if (user) {
        const previous_time = user.sessionTime || "00:00:00";

        // Obter o tempo decorrido desde o último acesso
        const current_time = new Date().getTime();
        const start_time = req.cookies.start_time || current_time;
        const elapsed_time = current_time - start_time;
        const formatted_elpsed_time = convert_milli(elapsed_time);

        // Somar o tempo decorrido com o tempo anterior
        const formatted_time = sum_time(previous_time, formatted_elpsed_time);

        // Atualizar o tempo de sessão no banco de dados
        await update_time(req.session.user.id_usuario, formatted_time);

        // Configurar cookies e sessão
        res.cookie(
          `sessionTime_${req.session.user.id_usuario}`,
          formatted_time,
          { maxAge: elapsed_time, httpOnly: true }
        );
        res.cookie("start_time", current_time, { httpOnly: true });
        req.session.formattedSessionTime = formatted_time;
      } else {
        console.error("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao calcular o tempo de sessão:", error);
    }
  }
  next();
}
// Função para somar dois tempos no formato HH:MM:SS
function sum_time(time1, time2) {
  const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
  const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

  let total_seconds = seconds1 + seconds2;
  let total_minutes = minutes1 + minutes2;
  let total_hours = hours1 + hours2;

  // Ajustar os minutos e segundos se forem maiores que 60
  if (total_seconds >= 60) {
    total_seconds -= 60;
    total_minutes++;
  }
  if (total_minutes >= 60) {
    total_minutes -= 60;
    total_hours++;
  }

  // Formatar o resultado
  const foramatted_hours = total_hours.toString().padStart(2, "0");
  const formatted_minutes = total_minutes.toString().padStart(2, "0");
  const formatted_seconds = total_seconds.toString().padStart(2, "0");

  return `${foramatted_hours}:${formatted_minutes}:${formatted_seconds}`;
}

// Função para converter milissegundos em HH:MM:SS
function convert_milli(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remaining_seconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remaining_seconds.toString().padStart(2, "0")}`;
}
async function update_time(userId, sessionTime) {
  await tb_usuario.update({ sessionTime }, { where: { id_usuario: userId } });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//rotas do back para o insomnia

router.get("/usuario", ControllerUsuario.getAllusuarios);
router.put("/usuario/id/:id_usuario", ControllerUsuario.editusuarioById);
router.post("/usuario/criar", ControllerUsuario.createNewusuario);
router.delete("/usuario/:id_usuario", ControllerUsuario.deleteusuarioById);

router.get("/pesquisa/:nm_usuario", ControllerUsuario.getUsuarioByName);

//rota para visualizar todos os arquivos que estão no mongo DB em json
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  return res.json(posts);
});

//rota do multer para ver através do back
router.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post(
  "/profile",
  uploadMiddleware.single("profileImage"),
  async (req, res) => {
    try {
      const profileImagePath = req.file.path;
      const userId = req.session.user.id_usuario;

      const exist_profile = await Profile.findOne({ userId });

      if (exist_profile) {
        await promisify(fs.unlink)(
          path.resolve(
            __dirname,
            "..",
            "..",
            "res",
            "photo",
            "profile",
            "tmp",
            exist_profile.key
          )
        );

        await Profile.deleteOne({ userId });
      }

      const profile = new Profile({
        userId,
        name: req.file.originalname,
        size: req.file.size,
        key: req.file.filename,
        url: `http://localhost:5000/image/${req.file.filename}`,
      });

      await profile.save();

      req.flash("success_msg", "Imagem alterada com sucesso");
      res.redirect("/perfil");
    } catch (error) {
      req.flash("error_msg", "Imagem não alterada");
      return res.redirect("/perfil");
    }
  }
);

router.post("/profile-delete", async (req, res) => {
  try {
    const userId = req.session.user.id_usuario;

    const exist_profile = await Profile.findOne({ userId });

    if (!exist_profile) {
      req.flash("Foto de usuario não encontrada");
      return res.redirect("/perfil");
    }

    await promisify(fs.unlink)(
      path.resolve(
        __dirname,
        "..",
        "..",
        "res",
        "photo",
        "profile",
        "tmp",
        exist_profile.key
      )
    );

    await Profile.deleteOne({ userId });

    req.flash("success_msg", "Perfil deletado com sucesso");
    return res.redirect("/perfil");
  } catch (error) {
    req.flash("error_msg", "Perfil deletado com sucesso");
    return res.redirect("/perfil");
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//rota para visualizar os videos/imagens de acordo com a categoria e nivel do usuário
router.get("/upload/:categoria", async (req, res) => {
  const { categoria } = req.params;

  try {
    // Verifica se o usuário está autenticado
    if (!req.session.user) {
      return res.redirect("/");
    }

    // Obtém o nível do usuário da sessão do usuário
    const nv_usu = req.session.user.nm_nivel;

    const files = await Post.find({ categoria });

    // Filtra os arquivos com base no nível do usuário
    const files_permitidos = files.filter((file) => {
      if (nv_usu === "Basico") {
        // Se o usuário for 'Basico', retorna apenas os arquivos 'Basico'
        return file.nivel === "Basico";
      } else if (nv_usu === "Intermediario") {
        // Se o usuário for 'Intermediário', retorna arquivos 'Basico' e 'Intermediário'
        return file.nivel === "Basico" || file.nivel === "Intermediario";
      } else {
        // Se o usuário for 'Avançado', retorna todos os arquivos
        return true;
      }
    });
    console.log("Nível do usuário:", nv_usu);

    // Renderiza o arquivo de modelo com os arquivos permitidos encontrados
    res.render("categoria", { file: files_permitidos });
  } catch (error) {
    console.error("Erro ao buscar arquivos:", error);
    res.status(500).send("Erro interno");
  }
});

router.post("/upload/:videoId/visualizado", async (req, res) => {
  const { videoId } = req.params;
  const userId = req.session.id;

  try {
    // Verifica se o usuário já assistiu ao vídeo anteriormente
    const video_view = await cl_views.findOne({ videoId, userId });

    if (video_view) {
      console.log("Este vídeo já foi assistido pelo usuário anteriormente.");
      return res.render("categoria", { assistido: true });
    }

    // Cria um novo registro na coleção de vídeos assistidos
    const new_video_view = new cl_views({
      videoId,
      userId,
    });

    await new_video_view.save();

    console.log("Vídeo assistido registrado com sucesso.");

    return res.render("categoria", { assistido: true });
  } catch (error) {
    console.error("Erro ao registrar vídeo assistido:", error);
    res.status(500).send("Erro interno");
  }
});

//rota para deletar os posts com base no id do arquivo
router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id });
    if (!post) {
      return res.status(404).send({ error: "Post não encontrado" });
    }

    return res.status(200).send({ message: "Post deletado com sucesso" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).send({ error: "Erro interno" });
  }
});

//aqui a função get e render vai pegar a url e renderizar ela no site

// a pagina inicial que irá aparecer ao entrar no server
router.get("/", (req, res) => {
  const formData = req.session.formData || {};
  req.session.formData = null; // Limpe os dados do formulário da sessão
  res.render("login", { formData: formData }); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/login_prof", (req, res) => {
  res.render("login_prof"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

// Rota que requer autenticação
router.get(
  "/index",
  checkAuthenticated,
  calcul_time,
  /*verificaAutenticacao,*/ (req, res) => {
    res.render("index");
  }
);

router.get("/kids", checkAuthenticated, (req, res) => {
  if (req.session.user) {
    res.render("kids", { user: req.session.user });
  }
});

router.get("/profissionais", checkAuthenticated, (req, res) => {
  res.render("profissionais"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/cadastro", (req, res) => {
  const formData = req.session.formData || {};
  req.session.formData = null; // Limpe os dados do formulário da sessão
  res.render("cadastro", { formData: formData }); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/cadastro1", (req, res) => {
  res.render("cadastro1"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/delete", checkAuthenticated, (req, res) => {
  res.render("delete");
});

router.get("/cadastro_prof", (req, res) => {
  res.render("cadastro_prof"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/cat-num", checkAuthenticated, (req, res) => {
  res.render("cat-num"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/aulas", checkAuthenticated, calcul_time, (req, res) => {
  if (req.session.user) {
    res.render("aulas", {
      user: req.session.user,
      formattedSessionTime: req.session.formattedSessionTime,
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

router.get("/perfil", checkAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user.id_usuario; // Certifique-se de que este ID está correto
    const profile = await Profile.findOne({ userId: userId });

    res.render("perfil", {
      user: req.session.user,
      profile: profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar perfil");
  }
});
//aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).

router.get("/upload", checkAuthenticated_Prof, (req, res) => {
  res.render("upload");
});

router.get("/categoria", checkAuthenticated, (req, res) => {
  res.render("categoria");
});

router.get("/profile", checkAuthenticated, (req, res) => {
  res.render("profile");
});

router.get("/profilePerfil", checkAuthenticated, (req, res) => {
  res.render("profilePerfil");
});

// Rota para servir os vídeos e demonstrar (para fins de teste. Não vai ser utilizado)
router.get("/videos/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "..", "..", "tmp", "uploads", filename);

  // Verifica se o arquivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(err);
      return res.status(404).send("Arquivo não encontrado");
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
