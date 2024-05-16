//conexão com o banco de dados
const mysql = require("mysql2");
const db = require('../../app.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const smtpconfig = require("../config/smtpConfig.js");
const nodemailer = require("nodemailer");
const { tb_usuario } = require('../models/usu_model.js')

//exportando os registros no route auth.js
exports.register = async (req, res) => {
  console.log(req.body);

  //declarando as variaveis presentes no forms de cadastro usuario 
  const { nome, sobrenome, email, senha, Confir_Senha, dt_nascimento } = req.body;

  //sessão para armazenar os dados
  req.session.formData = req.body;

  //Validação do campo da senha
  // const senha_Segura = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,}$/;

  // Verificação do email
  const Exist_usuario = await tb_usuario.findOne({ where: { ds_email: email } });
  if (Exist_usuario) {
    req.flash('error_msg', 'Email já em uso');
    return res.redirect('/cadastro')
  } else if (/\d/.test(nome)) {
    req.flash('error_msg', 'O nome não deve conter números');
    return res.redirect('/cadastro');
  } else if (/\d/.test(sobrenome)) {
    req.flash('error_msg', 'O sobrenome não deve conter números');
    return res.redirect('/cadastro');
  } else if (senha.length < 8) {
    req.flash('error_msg', 'Senha minimo 8 caractéres');
    return res.redirect('/cadastro')
    // // } else if (!senha_Segura.test(senha)) {
    // //   req.flash('error_msg', 'Senha não atende aos requisitos de segurança');
    //   return res.redirect('/cadastro')
  } else if (senha !== Confir_Senha) {
    req.flash('error_msg', 'As senhas não correspondem');
    return res.redirect('/cadastro')
  }


  // Criptografia da senha
  const hashedPassword = await bcrypt.hash(senha, 8);
  console.log(hashedPassword);


  // Inserção do usuário ao banco de dados
  try {
    const Add_usuario = await tb_usuario.create({
      nm_usuario: nome,
      nm_sobrenome: sobrenome,
      ds_email: email,
      nr_senha: hashedPassword,
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
    req.flash('success_msg', "Usuário cadastrado com sucesso")
    return res.redirect('/');
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro ao cadastrar usuário");
  }
};
