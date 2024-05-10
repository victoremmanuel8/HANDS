//conexão com o banco de dados
const mysql = require("mysql2");
const db = require('../../app.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const smtpconfig = require("../config/smtpConfig.js");
const nodemailer = require("nodemailer");
const {tb_usuario} = require('../models/usu_model.js')

exports.pass = async (req, res) => {
  console.log(req.body);
  console.log(req.session.user);

  const {New_Pass, Confir_Pass } = req.body;

  try {
    // Verifique se o usuário está logado
    if (!req.session.user) {
      req.flash('error_msg', 'Nenhum usuário logado');
      return res.redirect('/login');
    }

    // Busque o usuário no banco de dados usando o ID armazenado na sessão
    const db_usu = await tb_usuario.findOne({ where: { id_usuario: req.session.user.id_usuario }});
    if (!db_usu) {
      req.flash('error_msg', 'Usuário não encontrado');
      return res.redirect('/muda_senha');
    }

    // Verifique se a nova senha e a confirmação da nova senha são iguais
    if (New_Pass !== Confir_Pass) {
      req.flash('error_msg', 'Senha não corresponde');
      return res.redirect('/muda_senha');
    }
    
    // Criptografe a nova senha
    const hashedPassword = await bcrypt.hash(New_Pass, 8);
    console.log(hashedPassword);

    // Atualize a senha do usuário no banco de dados
    await db_usu.update({
      nr_senha: hashedPassword,
    }, {
      where: {
        id_usuario: req.session.user.id_usuario
      }
    });
    
    console.log('Senha atualizada com sucesso');
    req.flash('success_msg', 'Senha atualizada com sucesso');
    return res.redirect('/index');
  } catch (error) {
    console.log(error);
    req.flash('error_msg', 'Ocorreu um erro ao tentar atualizar a senha');
    return res.redirect('/muda_senha');
  }
};