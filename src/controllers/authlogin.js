//conexão com o banco de dados
const mysql = require("mysql2");
const db = require('../../app.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { tb_usuario } = require('../models/usu_model.js'); 

//exportando os registros no route auth.js
exports.login = async (req, res) => {
  console.log(req.body);

  //declarando as variaveis presentes no forms de login do usuario
  const { email, senha } = req.body;

// Selecionando o usuario correspondente do banco de dados
  try {
    const db_usu = await tb_usuario.findOne({ where: { email: email } });

    if (db_usu) {
      const compare = await bcrypt.compare(senha, db_usu.senha);

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