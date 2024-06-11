const { tb_usuario } = require("../models/usu_model.js");
const { tb_profissional } = require("../models/prof_model.js");

exports.edit = async (req, res) => {
  const { nome, email, estado } = req.body;
  const id_usu = req.session.user ? req.session.user.id_usuario : null;
  const id_prof = req.session.prof ? req.session.prof.id_profissional : null;
  try {
    if (id_usu) {
      await tb_usuario.update(
        { nm_usuario: nome, ds_email: email, nm_estado: estado },
        {
          where: { id_usuario: id_usu },
        }
      );

      // para atualizar os dados na hora, sem precisar deslogar
      if (nome) {
        req.session.user.nm_usuario = nome;
      }
      if (estado) {
        req.session.user.nm_estado = estado;
      }
    }
    if (id_prof) {
      await tb_profissional.update(
        { nm_prof: nome, ds_email: email, nm_estado: estado },
        {
          where: { id_profissional: id_prof },
        }
      );

      // para atualizar os dados na hora, sem precisar deslogar
      if (nome) {
        req.session.prof.nm_prof = nome;
      }
      if (estado) {
        req.session.prof.nm_estado = estado;
      }
    }

    return res.redirect("/perfil");
  } catch (erro) {
    console.error("Erro na consulta:", erro);
    return resp.status(400).json({ message: "Erro na consulta realizada!" });
  }
};
