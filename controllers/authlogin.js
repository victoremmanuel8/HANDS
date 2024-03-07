//conexão com o banco de dados
const mysql = require("mysql2");
const db = require('../app.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { tb_usuario } = require('../models/authregister_prof.js'); 


exports.login = async (req, res) => {
  console.log(req.body);

  const { email, senha } = req.body;

  try {
    const user = await tb_usuario.findOne({ where: { email: email } });

    if (user) {
      const compare = await bcrypt.compare(senha, user.senha);

      if (compare) {
        return res.redirect('/index');
      } else {
        return res.render('login', {
          message: "Senha incorreta"
        });
      }
    } else {
      return res.render('login', {
        message: "Usuário não encontrado"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao fazer login");
  }
};

//analisar o exports