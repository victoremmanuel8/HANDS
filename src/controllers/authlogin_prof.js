//conexão com o banco de dados
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { tb_profissional } = require("../models/prof_model.js");
const moment = require("moment");

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

    if (!db_prof) {
      req.flash("error_msg", "Usuario não encontrado");
      return res.redirect("/login_prof");
    } else if (db_prof.cd_rg !== rg) {
      req.flash("error_msg", "RG Incorreto");
      return res.redirect("/login_prof");
    } else {
      const compare = await bcrypt.compare(senha, db_prof.nr_senha);

      if (!compare) {
        req.flash("error_msg", "Senha/Email inválida");
        return res.redirect("/login_prof");
      } else {
        const idade = moment().diff(db_prof.dt_nascimento, "years");
        db_prof.nr_idade = idade; // Atribui a idade calculada ao campo nr_idade
        await db_prof.save(); // Salva a alteração no banco de dados
        const token = jwt.sign({ id: db_prof.id }, "JANX7AWB12BAZX");
        res.cookie("token_prof", token, { httpOnly: true, secure: true });
        req.session.prof = db_prof; // Armazena o usuário na sessão
        console.log(req.session.prof);
        req.flash("success_msg", `Seja bem-vindo(a), ${db_prof.nm_prof}`);
        try {
          const decoded_tk = jwt.verify(token, "JANX7AWB12BAZX");
          console.log(decoded_tk);
        } catch (err) {
          console.log("O token é inválido ou expirou");
        }
        return res.redirect("/index");
      }
    }
  } catch (error) {
    console.log(error);
    req.flash("error_msg", "Erro ao fazer login");
    return res.redirect("/login_prof");
  }
};
