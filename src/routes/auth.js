const express = require('express');
const req = require("../../node_modules/req/node_modules/mime");
const router = express.Router();
const authControllerregister = require('../controllers/authregister');
const authControllerlogin = require('../controllers/authlogin');
const authControllerprof = require('../controllers/authregister_prof');
const authControllerlogprof = require('../controllers/authlogin_prof');
const authControllerPassword = require('../controllers/authPassword');
const authControllerUpgrade = require('../controllers/authUpdate_nv');
const authControllerDelete = require('../controllers/authDelete');
const authControllerEdit = require('../controllers/authEdit');
const authControllerFoto = require('../controllers/authControllerFoto');
//aqui a função get e render vai pegar a url e renderizar ela no site

//                 'auth/foto'
// router.post('/foto', authControllerFoto.profile);

'auth/edit'
router.post("/#", authControllerEdit.edit);

'auth/delete'
router.post("/delete", authControllerDelete.delete);

'auth/atividades'
router.put('/atividades', authControllerUpgrade.update_nv);

'auth/muda_senha'
router.post('/perfil', authControllerPassword.pass)

'auth/cadastro_prof'
router.post("/cadastro_prof", authControllerprof.register)

'authlogin/login_prof'
router.post("/login_prof", authControllerlogprof.login)

'auth/cadastro'
router.post("/cadastro", authControllerregister.register)


//validações do login
'auth/login'
router.post("/login", authControllerlogin.login)
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