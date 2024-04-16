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
  const {email, senha } = req.body;

// Selecionando o usuario correspondente do banco de dados
  try {
    const db_usu = await tb_usuario.findOne({ where: { ds_email: email } });

    if (db_usu) {
      const compare = await bcrypt.compare(senha, db_usu.nr_senha);

      if (compare) {
        const token = jwt.sign({ id: db_usu.id }, 'JANX7AWB12BAKX');
        res.cookie('token', token, { httpOnly: true, secure: true });
        req.session.user = db_usu; // Armazena o usuário na sessão
        req.flash("success_msg", `Seja bem-vindo(a) ${db_usu.nm_usuario}`)
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