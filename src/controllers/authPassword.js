//conexão com o banco de dados
const mysql = require("mysql2");
const db = require('../../app.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const smtpconfig = require("../config/smtpConfig.js");
const nodemailer = require("nodemailer");
const {tb_usuario} = require('../models/usu_model.js')

//exportando os registros no route auth.js
exports.pass = async (req, res) => {
  console.log(req.body);

  //declarando as variaveis presentes no forms de cadastro do usuario
  const { email, New_Pass, Confir_Pass } = req.body;

  try {
  // Verificação do email
  const db_usu = await tb_usuario.findOne({ where: { ds_email: email}});
  if (!db_usu ) {
      return res.render('redef_senha', { message: "Usuário não encontrado" });
    }

  // Verificar se a nova senha e a confirmação da nova senha são iguais
  if (New_Pass !== Confir_Pass) {
    return res.render('redef_senha', { message: "A nova senha e a confirmação da nova senha não correspondem" });
  }
  
  // Criptografia da nova senha
  const hashedPassword = await bcrypt.hash(New_Pass, 8);
  console.log(hashedPassword);

  // Atualização da senha do usuário no banco de dados
    const Pass_New = await tb_usuario.update({
      nr_senha: hashedPassword,
    }, {
      where: {
        ds_email: email
      }
    });

    console.log(Pass_New);
    return res.redirect('/');
  } catch (error) {
    console.log(error);
    return res.redirect('redef_senha');
  }
};
