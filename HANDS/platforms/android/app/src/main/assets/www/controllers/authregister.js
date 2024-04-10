//conexão com o banco de dados
const mysql = require("mysql2");
const db = require('../app.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const smtpconfig = require("../../config/smtpConfig.js");
const nodemailer = require("nodemailer");
const {tb_usuario} = require('../models/usu_model.js')

//exportando os registros no route auth.js
exports.register = async (req, res) => {
  console.log(req.body);

  //declarando as variaveis presentes no forms de cadastro usuario 
  const { nome, sobrenome, email, senha, ConfirmarSenha, dt_nascimento } = req.body;

  // Verificação do email
  const Exist_usuario= await tb_usuario.findOne({ where: { email: email } });
  if (Exist_usuario) {
    return res.render('cadastro', { message: "Este email já está em uso" });
  } else if (senha !== ConfirmarSenha) {
    return res.render('cadastro', { message: "As senhas não correspondem" });
  }

  // Criptografia da senha
  const hashedPassword = await bcrypt.hash(senha, 8);
  console.log(hashedPassword);

  // Verificação da data de nascimento
  let dt_atual = new Date();
  let data_nascimento = new Date(dt_nascimento);
  
  if (data_nascimento >= dt_atual) {
    return res.render('cadastro', { message: "A data de nascimento não pode ser futura" });
  } else if (data_nascimento.getFullYear() < 1930) {
    return res.render('cadastro', { message: "A data de nascimento não pode ser anterior a 1930" });
  }
  

  // Inserção do usuário ao banco de dados
  try {
    const Add_usuario = await tb_usuario.create({
      nm_usuario: nome,
      nm_sobrenome: sobrenome,
      email: email,
      senha: hashedPassword,
      dt_nascimento: dt_nascimento
    });

    const htmlContent = `
    <html>
      <head>
        <style>
          /* Adicione seu CSS aqui */
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            text-align: center;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            text-decoration: none;
            background-color: #3498db;
            color: #ffffff;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <h1>Confirme seu Email</h1>
        <p>Clique no botão abaixo para confirmar seu email. Você será redirecionado para outra página</p>
        <a href="http://localhost:5000/">Confirmar E-mail</a>
      </body>
    </html>
  `;

    const transporter = nodemailer.createTransport(smtpconfig);

    async function sendmail() {
      try {
        const mailSend = await transporter.sendMail({
          html: htmlContent,
          subject: "confirme seu email no HANDS",
          from: "HANDS <hands_enterprise@outlook.com>",
          to: email,
        });
        console.log(mailSend);
      } catch (err) {
        console.error(`erro ao enviar email ${err}`);
      }
    }
    sendmail();

    console.log(Add_usuario);
    return res.redirect('/cadastro');
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao cadastrar usuário");
  }
};
