const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const ControllerUsuario = require("../controllers/consultaback_usu");
const ControllerProf = require("../controllers/consultaback_prof");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const Profile_prof = require("../models/Profile_prof");
const cl_views = require("../models/View");
const Theme = require("../models/Theme");
const Theme_prof = require("../models/Theme_prof");
const Comment = require("../models/comments");
const { tb_usuario } = require("../models/usu_model");
const { tb_profissional } = require("../models/prof_model");
const uploadMiddleware = require("../../middleware/photo_multer");
const commentRoute = express.Router();
const mongoose = require("mongoose");
const { isLogin } = require("../utils/loginHandeler");
const { body, validationResult } = require("express-validator");

router.use(express.json());
commentRoute.use(express.json());

//function do middleware (de sessão do profissional)
function checkAuthenticated_Prof(req, res, next) {
  if (req.session.prof) {
    next();
  } else {
    req.flash("success_msg", "Faça login para continuar navegando em nosso site");
    res.redirect("/login_prof");
  }
}

//function do middleware (de sessão do usuario)
function checkAuthenticated(req, res, next) {
  if (req.session.user || req.session.prof) {
    next();
  } else {
    req.flash("success_msg", "Faça login para continuar navegando em nosso site");
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
  try {
    let user, userId;

    if (req.session.user) {
      user = req.session.user;
      userId = user.id_usuario;
    } else if (req.session.prof) {
      user = req.session.prof;
      userId = user.id_profissional;
    } else {
      console.error("Usuário ou profissional não encontrado na sessão");
      return next(); // Continua para o próximo middleware
    }

    const previous_time = user.sessionTime || "00:00:00";
    const current_time = new Date().getTime();
    const start_time = req.cookies.start_time || current_time;
    const elapsed_time = current_time - start_time;
    const formatted_elapsed_time = convert_milli(elapsed_time);
    const formatted_time = sum_time(previous_time, formatted_elapsed_time);

    if (req.session.user) {
      await update_time(userId, formatted_time, "usuario");
    } else if (req.session.prof) {
      await update_time(userId, formatted_time, "profissional");
    }

    res.cookie(`sessionTime_${userId}`, formatted_time, {
      maxAge: elapsed_time,
      httpOnly: true,
    });
    res.cookie("start_time", current_time, { httpOnly: true });
    req.session.formattedSessionTime = formatted_time;
  } catch (error) {
    console.error("Erro ao calcular o tempo de sessão:", error);
    next(error); // Avança para o próximo middleware com o erro
  }
  next();
}

async function update_time(userId, sessionTime, userType) {
  try {
    if (userType === "usuario") {
      await tb_usuario.update(
        { sessionTime },
        { where: { id_usuario: userId } }
      );
    } else if (userType === "profissional") {
      await tb_profissional.update(
        { sessionTime },
        { where: { id_profissional: userId } }
      );
    } else {
      console.error(
        "Tipo de entidade desconhecido ao atualizar tempo de sessão"
      );
    }
  } catch (error) {
    console.error("Erro ao atualizar tempo de sessão:", error);
    throw error; // Lança o erro para ser capturado no bloco try
  }
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

//rotas do back para o insomnia
router.get("/usuario", ControllerUsuario.getAllusuarios);
router.put("/usuario/id/:id_usuario", ControllerUsuario.editusuarioById);
router.post("/usuario/criar", ControllerUsuario.createNewusuario);
router.delete("/usuario/:id_usuario", ControllerUsuario.deleteusuarioById);

router.get("/pesquisa/:nm_usuario", ControllerUsuario.getUsuarioByName);

//consulta do profissional
router.get("/profissional", ControllerProf.getAllprofissional);
router.put(
  "/profissional/id/:id_profissional",
  ControllerProf.editprofissionalById
);
router.post("/profissional/criar", ControllerProf.createNewprofissional);
router.delete(
  "/profissional/:id_profissional",
  ControllerProf.deleteprofissionalById
);

router.get("/pesquisa/:nm_prof", ControllerProf.getprofissionalByName);

//tema para o usuário
router.post("/profile/theme", async (req, res) => {
  try {
    const { theme_pref } = req.body;
    let userId;
    let profId;

    if (req.session.user) {
      userId = req.session.user.id_usuario;
    } else if (req.session.prof) {
      profId = req.session.prof.id_profissional;
    }

    if (userId) {
      let user_theme = await Theme.findOne({ userId });
      if (!user_theme) {
        user_theme = new Theme({ userId });
      }
      user_theme.theme_pref = theme_pref;
      await user_theme.save();
    }

    if (profId) {
      let prof_theme = await Theme_prof.findOne({ profId });
      if (!prof_theme) {
        prof_theme = new Theme_prof({ profId });
      }
      prof_theme.theme_pref = theme_pref;
      await prof_theme.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar preferência de tema:", error);
    res
      .status(500)
      .json({ error: "Erro interno ao atualizar preferência de tema" });
  }
});

router.get("/profile/theme", async (req, res) => {
  try {
    let userId;
    let profId;

    if (req.session.user) {
      userId = req.session.user.id_usuario;
    } else if (req.session.prof) {
      profId = req.session.prof.id_profissional;
    }

    let theme;

    if (userId) {
      theme = await Theme.findOne({ userId });
    } else if (profId) {
      theme = await Theme_prof.findOne({ profId });
    }

    if (!theme) {
      return res.status(404).json({ error: "Tema não encontrado" });
    }

    res.json({ theme_pref: theme.theme_pref });
  } catch (error) {
    console.error("Erro ao recuperar preferência de tema:", error);
    res
      .status(500)
      .json({ error: "Erro interno ao recuperar preferência de tema" });
  }
});

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

router.post(
  "/profile",
  uploadMiddleware.single("profileImage"),
  async (req, res) => {
    try {
      const profileImagePath = req.file.path;
      let userId;
      let profId;

      if (req.session.user) {
        userId = req.session.user.id_usuario;
      } else if (req.session.prof) {
        profId = req.session.prof.id_profissional;
      }
      if (userId) {
        let exist_profile = await Profile.findOne({ userId });
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
      }
      if (profId) {
        let exist_profile = await Profile_prof.findOne({ profId });
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

          await Profile_prof.deleteOne({ profId });
        }
        const profile_prof = new Profile_prof({
          profId,
          name: req.file.originalname,
          size: req.file.size,
          key: req.file.filename,
          url: `http://localhost:5000/image/${req.file.filename}`,
        });

        await profile_prof.save();
      }
      req.flash("success_msg", "Imagem alterada com sucesso");
      res.redirect("/index");
    } catch (error) {
      req.flash("error_msg", "Imagem não alterada");
      return res.redirect("/index");
    }
  }
);

router.post("/profile-delete", async (req, res) => {
  try {
    let userId;
    let profId;

    if (req.session.user) {
      userId = req.session.user.id_usuario;
    } else if (req.session.prof) {
      profId = req.session.prof.id_profissional;
    }

    if (userId) {
      const exist_profile = await Profile.findOne({ userId });

      if (!exist_profile) {
        req.flash("error_msg", "Foto de perfil não encontrada");
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
    }
    if (profId) {
      const exist_profile = await Profile_prof.findOne({ profId });

      if (!exist_profile) {
        req.flash("error_msg", "Foto de perfil não encontrada");
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

      await Profile_prof.deleteOne({ profId });
    }
    req.flash("success_msg", "Foto de perfil deletada com sucesso");
    return res.redirect("/index");
  } catch (error) {
    req.flash("error_msg", "Foto de perfil não deletada");
    return res.redirect("/index");
  }
});

//rota para visualizar os videos/imagens de acordo com a categoria e nivel do usuário
router.get("/upload/:categoria", async (req, res) => {
  try {
    let user_profile;
    let prof_profile;

    if (req.session.user) {
      user_profile = await Profile.findOne({
        userId: req.session.user.id_usuario,
      });
    } else if (req.session.prof) {
      prof_profile = await Profile_prof.findOne({
        profId: req.session.prof.id_profissional,
      });
    }
    //verificar as const se está verificada
    const userId = req.session.user ? req.session.user.id_usuario : null;
    const profId = req.session.prof ? req.session.prof.id_profissional : null;
    const { categoria } = req.params;

    if (!req.session.user && !req.session.prof) {
      return res.redirect("/");
    }

    let files_permitidos = [];
    let nv_usu = "";

    if (userId) {
      nv_usu = req.session.user.nm_nivel;
      const files = await Post.find({ categoria });
      files_permitidos = files.filter((file) => {
        if (nv_usu === "Basico") {
          return file.nivel === "Basico";
        } else if (nv_usu === "Intermediario") {
          return file.nivel === "Basico" || file.nivel === "Intermediario";
        } else {
          return true;
        }
      });
    }
    if (profId) {
      nv_usu = req.session.prof.nm_nivel;
      const files = await Post.find({ categoria });
      files_permitidos = files.filter((file) => {
        if (nv_usu === "Profissional") {
          return (
            file.nivel === "Basico" ||
            file.nivel === "Intermediario" ||
            file.nivel === "Avancado"
          );
        } else {
          return true;
        }
      });
    }
    res.render("categoria", {
      file: files_permitidos,
      user: req.session.user,
      prof: req.session.prof,
      user_profile,
      prof_profile,
    });
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//aqui a função get e render vai pegar a url e renderizar ela no site
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// a pagina inicial que irá aparecer ao entrar no server
router.get("/", (req, res) => {
  const formData = req.session.formData || {};
  req.session.formData = null; // Limpe os dados do formulário da sessão
  res.render("login", { formData: formData }); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/login_prof", (req, res) => {
  res.render("login_prof"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});
router.get("/cadastro", (req, res) => {
  const formData = req.session.formData || {};
  req.session.formData = null; // Limpe os dados do formulário da sessão
  res.render("cadastro", { formData: formData }); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});
router.get("/cadastroAdulto", (req, res) => {
  const formData = req.session.formData || {};
  req.session.formData = null; // Limpe os dados do formulário da sessão
  res.render("cadastroAdulto", { formData: formData }); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/cadastro1", (req, res) => {
  res.render("cadastro1"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/cadastro_prof", (req, res) => {
  res.render("cadastro_prof"); //aqui você colocará o index que deseja ou o diretório para acessar os html (hbs).
});

router.get("/delete", checkAuthenticated, (req, res) => {
  res.render("delete");
});

router.get("/index", calcul_time, async (req, res) => {
  try {
    let user_profile;
    let prof_profile;

    // Busca perfis de usuário e profissional
    if (req.session.user) {
      user_profile = await Profile.findOne({
        userId: req.session.user.id_usuario,
      });
    } else if (req.session.prof) {
      prof_profile = await Profile_prof.findOne({
        profId: req.session.prof.id_profissional,
      });
    }

    // Busca todos os comentários e suas respostas
    let comments = await Comment.find({}).populate("postedBy")
    .sort({ commentedAt: -1 });

    // Adiciona informações de perfil a cada comentário
    comments = await Promise.all(
      comments.map(async (comment) => {
        const user_profile = await Profile.findOne({
          userId: comment.postedBy,
        });
        const prof_profile = await Profile_prof.findOne({
          profId: comment.postedBy,
        });

        return {
          ...comment.toObject(),
          userProfile: user_profile ? user_profile : null,
          profProfile: prof_profile ? prof_profile : null,
          postedBy: comment.postedBy,
        };
      })
    );

    // Renderiza a página "index" com todos os dados necessários
    res.render("index", {
      user: req.session.user,
      prof: req.session.prof,
      user_profile,
      prof_profile,
      comments,  // Adiciona os comentários ao contexto da renderização
    });
  } catch (error) {
    console.error("Failed to load index page:", error);
    req.flash("error_msg", "Erro ao carregar a página inicial");
    res.redirect("/login");
  }
});

router.get("/profissionais", async (req, res) => {
  try {
    let user_profile;
    let prof_profile;

    // Busca perfis de usuário e profissional
    if (req.session.user) {
      user_profile = await Profile.findOne({
        userId: req.session.user.id_usuario,
      });
    } else if (req.session.prof) {
      prof_profile = await Profile_prof.findOne({
        profId: req.session.prof.id_profissional,
      });
    }

    // Buscar todos os profissionais
    const profissionais = await tb_profissional.findAll();

    // Buscar todas as fotos dos profissionais no MongoDB
    const profPhotos = await Profile_prof.find();

    // Mapear os dados para incluir nome, foto e outras informações
    const Prof_map = profissionais.map((profissional) => {
      const profPhoto = profPhotos.find(
        (photo) => photo.profId.toString() === profissional.id_profissional.toString()
      );
      return {
        id_profissional: profissional.id_profissional,
        nm_prof: profissional.nm_prof,
        nr_idade: profissional.nr_idade,
        nm_estado: profissional.nm_estado,
        profPhoto: profPhoto ? profPhoto.url : null,
      };
    });

    res.render("profissionais", {
      user: req.session.user,
      prof: req.session.prof,
      user_profile,
      prof_profile,
      Prof_map,
    });
  } catch (error) {
    console.error("Erro ao carregar perfil:", error);
    req.flash("error_msg", "Erro ao carregar perfil");
    res.redirect("/login");
  }
});

// router.get("/prof", checkAuthenticated, async (req, res) => {
//   try {
//     // Buscar todos os profissionais
//     const profissionais = await tb_profissional.findAll();

//     // Buscar todas as fotos dos profissionais no MongoDB
//     const profPhotos = await Profile_prof.find();

//     // Mapear os dados para incluir nome, foto e outras informações
//     const Prof_map = profissionais.map((profissional) => {
//       const profPhoto = profPhotos.find(
//         (photo) => photo.profId.toString() === profissional.id_profissional.toString()
//       );
//       return {
//         id_profissional: profissional.id_profissional,
//         nm_prof: profissional.nm_prof,
//         nr_idade: profissional.nr_idade,
//         profPhoto: profPhoto ? profPhoto.url : null,
//       };
//     });

//     res.render("prof", {
//       user: req.session.user,
//       prof: req.session.prof,
//       Prof_map,
//     });
//   } catch (error) {
//     console.error("Erro ao carregar perfil:", error);
//     req.flash("error_msg", "Erro ao carregar perfil");
//     res.redirect("/");
//   }
// });

router.get("/kids",  async (req, res) => {
  try {
    let user_profile;
    let prof_profile;

    if (req.session.user) {
      user_profile = await Profile.findOne({
        userId: req.session.user.id_usuario,
      });
    } else if (req.session.prof) {
      prof_profile = await Profile_prof.findOne({
        profId: req.session.prof.id_profissional,
      });
    }

    res.render("kids", {
      user: req.session.user,
      prof: req.session.prof,
      user_profile,
      prof_profile,
    });
  } catch (error) {
    req.flash("error_msg", "Erro ao carregar perfil");
    res.redirect("/login");
  }
});


router.get("/cat-num", checkAuthenticated, async (req, res) => {
  try {
    let user_profile;
    let prof_profile;

    if (req.session.user) {
      user_profile = await Profile.findOne({
        userId: req.session.user.id_usuario,
      });
    } else if (req.session.prof) {
      prof_profile = await Profile_prof.findOne({
        profId: req.session.prof.id_profissional,
      });
    }

    res.render("cat-num", {
      user: req.session.user,
      prof: req.session.prof,
      user_profile,
      prof_profile,
    });
  } catch (error) {
    req.flash("error_msg", "Erro ao carregar perfil");
    res.redirect("/login");
  }
});

router.get("/aulas", checkAuthenticated, calcul_time, async (req, res) => {
  try {
    let user_profile = null;
    let prof_profile = null;

    if (req.session.user) {
      user_profile = await Profile.findOne({
        userId: req.session.user.id_usuario,
      });
    } else if (req.session.prof) {
      prof_profile = await Profile_prof.findOne({
        profId: req.session.prof.id_profissional,
      });
    }

    res.render("aulas", {
      user: req.session.user,
      prof: req.session.prof,
      formattedSessionTime: req.session.formattedSessionTime,
      user_profile,
      prof_profile,
    });
  } catch (error) {
    req.flash("error_msg", "Erro ao carregar perfil");
    res.redirect("/login");
  }
});

router.get("/header", checkAuthenticated, (req, res) => {
  res.render("header");
});

router.get("/termos-uso", (req, res) => {
  res.render("termos-uso");
});

router.get("/atividades", checkAuthenticated, async (req, res) => {
  try {
    let user_profile;
    let prof_profile;

    if (req.session.user) {
      user_profile = await Profile.findOne({
        userId: req.session.user.id_usuario,
      });
    } else if (req.session.prof) {
      prof_profile = await Profile_prof.findOne({
        profId: req.session.prof.id_profissional,
      });
    }

    res.render("atividades", {
      user: req.session.user,
      prof: req.session.prof,
      user_profile,
      prof_profile,
    });
  } catch (error) {
    req.flash("error_msg", "Erro ao carregar perfil");
    res.redirect("/login");
  }
});

router.get("/atividades-rj", checkAuthenticated, async (req, res) => {
  try {
    let user_profile;
    let prof_profile;

    if (req.session.user) {
      user_profile = await Profile.findOne({
        userId: req.session.user.id_usuario,
      });
    } else if (req.session.prof) {
      prof_profile = await Profile_prof.findOne({
        profId: req.session.prof.id_profissional,
      });
    }

    res.render("atividades-rj", {
      user: req.session.user,
      prof: req.session.prof,
      user_profile,
      prof_profile,
    });
  } catch (error) {
    req.flash("error_msg", "Erro ao carregar perfil");
    res.redirect("/login");
  }
});

router.get("/pesquisa", (req, res) => {
  res.render("pesquisa");
});

router.get("/perfil", checkAuthenticated, async (req, res) => {
  try {
    let user_profile;
    let prof_profile;

    if (req.session.user) {
      user_profile = await Profile.findOne({
        userId: req.session.user.id_usuario,
      });
    } else if (req.session.prof) {
      prof_profile = await Profile_prof.findOne({
        profId: req.session.prof.id_profissional,
      });
    }

    res.render("perfil", {
      user: req.session.user,
      prof: req.session.prof,
      user_profile,
      prof_profile,
    });
  } catch (error) {
    req.flash("error_msg", "Erro ao carregar perfil");
    res.redirect("/login");
  }
});

router.get("/upload", checkAuthenticated_Prof, async (req, res) => {
  try {
    let user_profile;
    let prof_profile;

    if (req.session.user) {
      user_profile = await Profile.findOne({
        userId: req.session.user.id_usuario,
      });
    } else if (req.session.prof) {
      prof_profile = await Profile_prof.findOne({
        profId: req.session.prof.id_profissional,
      });
    }

    res.render("upload", {
      user: req.session.user,
      prof: req.session.prof,
      user_profile,
      prof_profile,
    });
  } catch (error) {
    req.flash("error_msg", "Erro ao carregar perfil");
    res.redirect("/login");
  }
});

router.get("/profile", checkAuthenticated, async (req, res) => {
  try {
    let user_profile;
    let prof_profile;

    if (req.session.user) {
      user_profile = await Profile.findOne({
        userId: req.session.user.id_usuario,
      });
    } else if (req.session.prof) {
      prof_profile = await Profile_prof.findOne({
        profId: req.session.prof.id_profissional,
      });
    }

    res.render("profile", {
      user: req.session.user,
      prof: req.session.prof,
      user_profile,
      prof_profile,
    });
  } catch (error) {
    req.flash("error_msg", "Erro ao carregar perfil");
    res.redirect("/login");
  }
});

router.get("/profilePerfil", checkAuthenticated, async (req, res) => {
  try {
    let user_profile;
    let prof_profile;

    if (req.session.user) {
      user_profile = await Profile.findOne({
        userId: req.session.user.id_usuario,
      });
    } else if (req.session.prof) {
      prof_profile = await Profile_prof.findOne({
        profId: req.session.prof.id_profissional,
      });
    }

    res.render("profilePerfil", {
      user: req.session.user,
      prof: req.session.prof,
      user_profile,
      prof_profile,
    });
  } catch (error) {
    req.flash("error_msg", "Erro ao carregar perfil");
    res.redirect("/login");
  }
});

router.get("/profileSenha", checkAuthenticated, async (req, res) => {
  try {
    let user_profile;
    let prof_profile;

    if (req.session.user) {
      user_profile = await Profile.findOne({
        userId: req.session.user.id_usuario,
      });
    } else if (req.session.prof) {
      prof_profile = await Profile_prof.findOne({
        profId: req.session.prof.id_profissional,
      });
    }

    res.render("profileSenha", {
      user: req.session.user,
      prof: req.session.prof,
      user_profile,
      prof_profile,
    });
  } catch (error) {
    req.flash("error_msg", "Erro ao carregar perfil");
    res.redirect("/login");
  }
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
