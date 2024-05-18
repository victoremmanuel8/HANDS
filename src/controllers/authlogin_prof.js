//conexão com o banco de dados
const mysql = require("mysql2");
const db = require("../../app.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { tb_profissional } = require("../models/prof_model.js");

//exportando os registros no route auth.js
exports.login = async (req, res) => {
  console.log(req.body);

  //declarando as variaveis presentes no forms de login profissional
  const { email, rg, senha } = req.body;

  // Selecionando o profissional correspondente do banco de dados
  try {
    const db_prof = await tb_profissional.findOne({
      where: { ds_email: email, cd_rg: rg },
    });

    if (db_prof) {
      const compare = await bcrypt.compare(senha, db_prof.nr_senha);

      if (compare) {
        return res.redirect("/index");
      } else {
        return res.render("login_prof", {
          message: "Senha incorreta",
        });
      }
    } else {
      return res.render("login_prof", {
        message: "Usuário não encontrado",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao fazer login");
  }
};
