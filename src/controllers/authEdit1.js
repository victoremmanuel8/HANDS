const { tb_usuario } = require("../models/usu_model.js");
const { tb_profissional } = require("../models/prof_model.js");
const bcrypt = require("bcrypt");

exports.edit1 = async (req, res) => {
  const { Atual_Pass, nome, email, estado } = req.body;
  const id_usu = req.session.user ? req.session.user.id_usuario : null;
  const id_prof = req.session.prof ? req.session.prof.id_profissional : null;
  
  try {
    if (id_usu) {
      const usuario = await tb_usuario.findByPk(id_usu);
      if (!usuario) {
        req.flash("error_msg", "Usuário não encontrado");
        return res.redirect("/profilePerfil");
      }

      // if (!(await bcrypt.compare(Atual_Pass, usuario.nr_senha))) {
      //   req.flash("error_msg", "Senha atual inválida");
      //   return res.redirect("/profileSenha");
      // }
      await tb_usuario.update(
        { nm_usuario: nome, ds_email: email, nm_estado: estado },
        { where: { id_usuario: id_usu } }
      );

      // Atualiza os dados na sessão do usuário
      if (nome) {
        req.session.user.nm_usuario = nome;
      }
      if (estado) {
        req.session.user.nm_estado = estado;
      }
    }

    if (id_prof) {
      const profissional = await tb_profissional.findByPk(id_prof);
      if (!profissional) {
        req.flash("error_msg", "Profissional não encontrado");
        return res.redirect("/profilePerfil");
      }

      // if (!(await bcrypt.compare(Atual_Pass, profissional.nr_senha))) {
      //   req.flash("error_msg", "Senha atual inválida");
      //   return res.redirect("/profileSenha");
      // }

      await tb_profissional.update(
        { nm_prof: nome, ds_email: email, nm_estado: estado },
        { where: { id_profissional: id_prof } }
      );

      // Atualiza os dados na sessão do profissional
      if (nome) {
        req.session.prof.nm_prof = nome;
      }
      if (estado) {
        req.session.prof.nm_estado = estado;
      }
    }

    return res.redirect("/profilePerfil");
  } catch (error) {
    console.error("Erro na consulta:", error);
    req.flash("error_msg", "Erro ao atualizar perfil");
    return res.redirect("/profilePerfil");
  }
};
