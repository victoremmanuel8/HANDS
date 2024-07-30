const bcrypt = require("bcryptjs");
const { tb_usuario } = require("../models/usu_model.js");

exports.pass = async (req, res) => {
  const { Atual_Pass, New_Pass, Confir_Pass } = req.body;

  try {
    // Verifique se o usuário está logado
    if (!req.session.user) {
      req.flash("error_msg", "Nenhum usuário logado");
      return res.redirect("/");
    }

    // Usuario da sessão
    const db_usu = await tb_usuario.findOne({
      where: { id_usuario: req.session.user.id_usuario },
    });
    if (!db_usu) {
      // req.flash('error_msg', 'Usuário não encontrado');
      return res.redirect("/profileSenha");
    }

    if (!(await bcrypt.compare(Atual_Pass, db_usu.nr_senha))) {
      req.flash("error_msg", "Senha atual inválida");
      return res.redirect("/profileSenha");
    }
    if (New_Pass.length < 8) {
      req.flash(
        "error_msg",
        "A nova senha deve ter pelo menos 8 caracteres."
      );
      return res.redirect("/profileSenha");
    }
    if (Confir_Pass.length < 8) {
      req.flash(
        "error_msg",
        "A nova senha deve ter pelo menos 8 caracteres."
      );
      return res.redirect("/profileSenha");
    }

    if (New_Pass !== Confir_Pass) {
      req.flash("error_msg", "Senha não corresponde");
      return res.redirect("/profileSenha");
    }

    // Criptografe a nova senha
    const hashedPassword = await bcrypt.hash(New_Pass, 8);
    console.log(hashedPassword);

    // Atualize a senha do usuário no banco de dados
    await db_usu.update(
      {
        nr_senha: hashedPassword,
      },
      {
        where: {
          id_usuario: req.session.user.id_usuario,
        },
      }
    );

    console.log("Senha atualizada com sucesso");
    req.flash("success_msg", "Senha atualizada com sucesso");
    return res.redirect("/perfil");
  } catch (error) {
    console.log(error);
    req.flash("error_msg", "Ocorreu um erro ao tentar atualizar a senha");
    return res.redirect("/profileSenha");
  }
};
