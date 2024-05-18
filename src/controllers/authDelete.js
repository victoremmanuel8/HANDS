const mysql = require("mysql2");
const db = require("../../app.js");
const bcrypt = require("bcryptjs");
const { tb_usuario } = require("../models/usu_model.js");

exports.delete = async (req, res) => {
  const { senha_usu } = req.body;

  try {
    const db_usu = await tb_usuario.findOne({
      where: { id_usuario: req.session.user.id_usuario },
    });
    if (!db_usu) {
      // req.flash('error_msg', 'Usuário não encontrado');
      return res.redirect("/perfil");
    }
    if (!(await bcrypt.compare(senha_usu, db_usu.nr_senha))) {
      req.flash("success_msg", "Senha atual inválida");
      return res.redirect("/delete");
    }
    await tb_usuario.destroy({
      where: { id_usuario: db_usu.id_usuario },
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    req.flash("success_msg", "Ocorreu um erro ao tentar excluir o usuario");
    return res.redirect("/delete");
  }
};
