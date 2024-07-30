const express = require("express");
const req = require("../../node_modules/req/node_modules/mime");
const router = express.Router();
const authControllerregister = require("../controllers/authregister");
const authControllerlogin = require("../controllers/authlogin");
const authControllerprof = require("../controllers/authregister_prof");
const authControllerlogprof = require("../controllers/authlogin_prof");
const authControllerPassword = require("../controllers/authPassword");
const authControllerUpgrade = require("../controllers/authUpdate_nv");
const authControllerDelete = require("../controllers/authDelete");
const authControllerEdit = require("../controllers/authEdit");
const authControllerEdit1 = require("../controllers/authEdit1");
// const uploadMiddleware = require("../../middleware/photo_multer");
// const fotoPerfilController = require('../controllers/authControllerFoto');
//aqui a função get e render vai pegar a url e renderizar ela no site

//                 'auth/foto'
// router.post('/foto', authControllerFoto.profile);

// router.post('/upload/imgPerfil',
//     _multer_ProfImgUpload.single('image'),
//     fotoPerfilController.uploadFotoPerfil
// )

("auth/edit");
router.post("/edit", authControllerEdit.edit);

("auth/edit1");
router.post("/edit1", authControllerEdit1.edit1);

("auth/delete");
router.post("/delete", authControllerDelete.delete);

("auth/atividades");
router.put("/atividades", authControllerUpgrade.update_nv);

("auth/muda_senha");
router.post("/perfil", authControllerPassword.pass);

("auth/cadastro_prof");
router.post("/cadastro_prof", authControllerprof.register);

("authlogin/login_prof");
router.post("/login_prof", authControllerlogprof.login);

("auth/cadastro");
router.post("/cadastro", authControllerregister.register);

// router.post(
//   "/profile",
//   uploadMiddleware.single("profileImage"),
//   async (req, res) => {

//     try {
//       const profileImagePath = req.file.path;
//       const userId = req.session.user.id_usuario;

//       const exist_profile = await Profile.findOne({ userId });

//       if (exist_profile) {

//         await promisify(fs.unlink)(
//           path.resolve(
//             __dirname,
//             "..",
//             "..",
//             "res",
//             "photo",
//             "profile",
//             "tmp",
//             exist_profile.key
//           )
//         );

//         await Profile.deleteOne({ userId });
//       }

//       const profile = new Profile({
//         userId,
//         name: req.file.originalname,
//         size: req.file.size,
//         key: req.file.filename,
//         url: `http://localhost:5000/image/${req.file.filename}`,
//       });

//       await profile.save();

//       req.flash("success_msg", "Imagem alterada com sucesso")
//       res.redirect("/profile")
//     } catch (error) {
//       req.flash("error_msg", "Imagem não alterada")
//       return res.redirect("/profile")
//     }
//   }
// );

//validações do login
("auth/login");
router.post("/login", authControllerlogin.login);
//     const { email, senha} = req.body;

//     const erros = [];

//     if (!email || typeof email === 'undefined' || email === null) {
//         erros.push({ text: "Email Inválido" });
//     }

//     if (!senha || typeof senha === 'undefined' || senha === null) {
//         erros.push({ text: "Senha inválida" });
//     } else if (senha.length < 8) {
//         erros.push({ text: "Senha da categoria muito pequena" });
//     }

//     if (erros.length > 0) {
//         res.render("login", { erros: erros });
//     } else {
//         authControllerlogin.login(req, res);
//     }
//   });

//   'auth/cadastro'
//   router.post("/cadastro", (req, res) => {
//       const { senha, Confir_Senha, step} = req.body;

//       const erros = [];

//       if (!senha || typeof senha === 'undefined' || senha === null) {
//         erros.push({ text: "Senha da categoria muito pequena" });
//       }  if (senha.length < 8) {
//         erros.push({ text: "Senha da categoria muito pequena" });
//     }  else if (Confir_Senha.length < 8) {
//         erros.push({ text: "Senha da categoria muito pequena" });
//       }
//       if (erros.length > 0) {
//           res.render("cadastro", { erros: erros, step:step });
//       } else {
//         authControllerregister.register(req, res);
//       }
//     });

module.exports = router;
