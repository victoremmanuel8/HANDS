//conexão com o banco de dados
const mysql = require("mysql2");
const db = require("../../app.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { tb_profissional } = require("../models/prof_model.js");

//exportando os registros no route auth.js
exports.register = async (req, res) => {
  console.log(req.body);

  const { nome, sobrenome, email, rg, senha, Confir_Senha, dt_nascimento } =
    req.body;

  //sessão para armazenar os dados
  req.session.formData = req.body;

  // Verificação do email
  const Exist_prof = await tb_profissional.findOne({
    where: { ds_email: email},
  });
  if (Exist_prof) {
    req.flash("error_msg", "Email já em uso");
    return res.redirect("/cadastro_prof");
  } else if (/\d/.test(nome)) {
    req.flash("error_msg", "O nome não deve conter números");
    return res.redirect("/cadastro_prof");
  } else if (/\d/.test(sobrenome)) {
    req.flash("error_msg", "O sobrenome não deve conter números");
    return res.redirect("/cadastro_prof");
  }else if (senha.length < 8) {
    req.flash("error_msg", "Senha minimo 8 caractéres");
    return res.redirect("/cadastro_prof");
    // // } else if (!senha_Segura.test(senha)) {
    // //   req.flash('error_msg', 'Senha não atende aos requisitos de segurança');
    //   return res.redirect('/cadastro')
  } else if (senha !== Confir_Senha) {
    req.flash("error_msg", "As senhas não correspondem");
    return res.redirect("/cadastro_prof");
  }

  const Exist_rg = await tb_profissional.findOne({
    where: {cd_rg : rg},
  });
  if (Exist_rg) {
    req.flash("RG já em uso")
    return res.redirect("/cadastro_prof");
  }

  // Criptografia da senha
  const hashedPassword = await bcrypt.hash(senha, 8);
  console.log(hashedPassword);

  // Inserção do profissional ao banco de dados
  try {
    const Add_prof = await tb_profissional.create({
      nm_prof: nome,
      nm_sobrenome: sobrenome,
      ds_email: email,
      cd_rg: rg,
      nr_senha: hashedPassword,
      dt_nascimento: dt_nascimento,
    });
    console.log(Add_prof);
    req.flash("success_msg", "Profissional cadastrado com sucesso");
    return res.redirect("/login_prof");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao cadastrar usuário");
  }
};
