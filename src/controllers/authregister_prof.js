//conexão com o banco de dados
const mysql = require("mysql2");
const db = require('../../app.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {tb_profissional} = require('../models/prof_model.js')

//exportando os registros no route auth.js
exports.register = async (req, res) => {
  console.log(req.body);

  const { nome, sobrenome, email, rg, senha, ConfirmarSenha, dt_nascimento } = req.body;

  // Verificação do email
  const Exist_prof = await tb_profissional.findOne({ where: { email: email } });
  if (Exist_prof) {
    return res.render('cadastro', { message: "Este email já está em uso" });
  } else if (senha !== ConfirmarSenha) {
    return res.render('cadastro', { message: "As senhas não correspondem" });
  }

  // Criptografia da senha
  const hashedPassword = await bcrypt.hash(senha, 8);
  console.log(hashedPassword);

  // Inserção do profissional ao banco de dados
  try {
    const Add_prof= await tb_profissional.create({
      nm_prof: nome,
      nm_sobrenome: sobrenome,
      email: email,
      cd_rg: rg,
      senha: hashedPassword,
      dt_nascimento: dt_nascimento
    });
    console.log(Add_prof);
    return res.redirect('/index');
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao cadastrar usuário");
  }
};
