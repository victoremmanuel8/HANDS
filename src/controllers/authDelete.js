const bcrypt = require("bcryptjs");
const { tb_usuario } = require("../models/usu_model.js");
const { tb_profissional } = require("../models/prof_model.js");

exports.delete = async (req, res) => {
  const { senha_usu } = req.body;
  const id_usu = req.session.user ? req.session.user.id_usuario : null;
  const id_prof = req.session.prof ? req.session.prof.id_profissional : null;
  try {
    if (id_usu) {
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
    }
    if (id_prof) {
      const db_prof = await tb_profissional.findOne({
        where: { id_profissional: req.session.prof.id_profissional },
      });
      if (!db_prof) {
        // req.flash('error_msg', 'Usuário não encontrado');
        return res.redirect("/perfil");
      }
      if (!(await bcrypt.compare(senha_usu, db_prof.nr_senha))) {
        req.flash("success_msg", "Senha atual inválida");
        return res.redirect("/delete");
      }
      await tb_profissional.destroy({
        where: { id_profissional: db_prof.id_profissional },
      });
    }
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    req.flash("success_msg", "Ocorreu um erro ao tentar excluir o usuario");
    return res.redirect("/delete");
  }
};
