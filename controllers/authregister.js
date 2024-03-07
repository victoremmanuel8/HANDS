//conexão com o banco de dados
const mysql = require("mysql2");
const db = require('../app.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {tb_usuario} = require('../models/authregister.js')

exports.register = async (req, res) => {
  console.log(req.body);

  const { nome, sobrenome, email, senha, ConfirmarSenha, dt_nascimento } = req.body;

  // Verificação do email
  const exisUser = await tb_usuario.findOne({ where: { email: email } });
  if (exisUser) {
    return res.render('cadastro', { message: "Este email já está em uso" });
  } else if (senha !== ConfirmarSenha) {
    return res.render('cadastro', { message: "As senhas não correspondem" });
  }

  // Criptografia da senha
  const hashedPassword = await bcrypt.hash(senha, 8);
  console.log(hashedPassword);

  // Inserção do usuário
  try {
    const newUser = await tb_usuario.create({
      nm_nome: nome,
      nm_sobrenome: sobrenome,
      email: email,
      senha: hashedPassword,
      dt_nascimento: dt_nascimento
    });
    console.log(newUser);
    return res.redirect('/index');
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao cadastrar usuário");
  }
};
