const mysql = require("mysql2");
const db = require('../../app.js');
const {tb_usuario} = require('../models/usu_model.js');

exports.edit = async (req, res) => {
  const { nome, email, descricao } = req.body;
  const id_usu = req.session.user.id_usuario
  try {
    await tb_usuario.update({ nm_usuario: nome, ds_email: email, ds_descricao: descricao}, {
      where: { id_usuario: id_usu }
    });
    return res.redirect('/perfil')
  }
  catch(erro) {
      console.error('Erro na consulta:', erro)
      return resp.status(400).json({ message: 'Erro na consulta realizada!' })
  }
}