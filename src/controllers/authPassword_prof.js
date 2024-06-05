const bcrypt = require("bcryptjs");
const { tb_profissional } = require("../models/prof_model.js");

exports.pass = async (req, res) => {
  const { Atual_Pass, New_Pass, Confir_Pass } = req.body;

  try {
    // Verifique se o usuário está logado
    if (!req.session.prof) {
      req.flash("success_msg", "Nenhum usuário logado");
      return res.redirect("/");
    }

    // Usuario da sessão
    const db_prof = await tb_profissional.findOne({
      where: { id_prof: req.session.prof.id_prof },
    });
    if (!db_prof) {
      // req.flash('error_msg', 'Usuário não encontrado');
      return res.redirect("/perfil");
    }

    if (!(await bcrypt.compare(Atual_Pass, db_usu.nr_senha))) {
      req.flash("success_msg", "Senha atual inválida");
      return res.redirect("/perfil");
    }
    if (New_Pass.length < 8) {
      req.flash(
        "success_msg",
        "A nova senha deve ter pelo menos 8 caracteres."
      );
      return res.redirect("/perfil");
    }
    if (Confir_Pass.length < 8) {
      req.flash(
        "success_msg",
        "A nova senha deve ter pelo menos 8 caracteres."
      );
      return res.redirect("/perfil");
    }

    if (New_Pass !== Confir_Pass) {
      req.flash("success_msg", "Senha não corresponde");
      return res.redirect("/perfil");
    }

    // Criptografe a nova senha
    const hashedPassword = await bcrypt.hash(New_Pass, 8);
    console.log(hashedPassword);

    // Atualize a senha do usuário no banco de dados
    await db_prof.update(
      {
        nr_senha: hashedPassword,
      },
      {
        where: {
          id_prof: req.session.prof.id_prof,
        },
      }
    );

    console.log("Senha atualizada com sucesso");
    req.flash("success_msg", "Senha atualizada com sucesso");
    return res.redirect("/index");
  } catch (error) {
    console.log(error);
    req.flash("success_msg", "Ocorreu um erro ao tentar atualizar a senha");
    return res.redirect("/perfil");
  }
};
