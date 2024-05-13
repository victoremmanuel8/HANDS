const mysql = require("mysql2");
const db = require('../../app.js');
const {tb_usuario} = require('../models/usu_model.js');

exports.delete = async (req, res) => {
  const id_usu = req.session.user.id_usuario
  try {
    await tb_usuario.destroy({
      where: { id_usuario: id_usu }
    });
    return res.redirect('/')
  }
  catch(erro) {
      console.error('Erro na consulta:', erro)
      return resp.status(400).json({ message: 'Erro na consulta realizada!' })
  }
}