const mysql = require("mysql2");
const db = require('../../app.js');
const { tb_usuario } = require('../models/usu_model.js');

exports.update_nv = async (req, res) => {

  try {
    await tb_usuario.update({ nm_nivel: 'Intermediario' }, {
      where: { id_usuario: req.session.user.id_usuario }
    });

    //Para atualizar a sessão na hora, sem precisar fazer logout e login novamente 
    req.session.user.nm_nivel = 'Intermediario';

    req.flash('success_msg', 'Nível do usuário atualizado com sucesso!');
    return res.redirect('/index')
  } catch (error) {
    console.log(error);
    req.flash('error_msg', 'Erro ao subir de nível');
    return res.redirect('/atividades')
  }
};