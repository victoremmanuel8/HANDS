const { raw } = require("body-parser");
const { tb_profissional } = require("../models/prof_model.js");
const { Sequelize, Op } = require("sequelize");

module.exports = {
  getAllprofissional: async (req, resp) => {
    try {
      const Allprof = await tb_profissional.findAll();
      if (!Allprof)
        return resp
          .status(404)
          .json({ message: "Profissional não encontrado!" });
      return resp.status(200).json(Allprof);
    } catch (erro) {
      console.log("Erro na consulta: ", erro);
      res.status(500).json({ message: "Erro interno do servidor!" });
    }
  },
  getprofissionalById: async (req, resp) => {
    try {
      const { id_profissional } = req.params;
      const profissional = await tb_profissional.findByPk(id_profissional);

      if (!profissional)
        return resp
          .status(404)
          .json({ message: "Profissional não encontrado!" });
      else return resp.status(200).json(profissional);
    } catch (erro) {
      console.log("Erro na consulta: ", erro);
      return resp.status(400).json({ message: "Erro na consulta realizada!" });
    }
  },
  getprofissionalByName: async (req, res) => {
    try {
      const nm_prof = req.params.nm_prof; // Pegar o valor do parâmetro da URL
      const resultado = await tb_profissional.findOne({
        where: {
          nm_prof: nm_prof,
        },
      });
      if (resultado) {
        res.json(resultado); // Enviar resultado como JSON
      } else {
        res.status(404).json({ message: "Profissional não encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },
  editprofissionalById: async (req, resp) => {
    try {
      const { id_profissional } = req.params;
      const { nm_prof, nm_sobrenome, email, senha, dt_nascimento } = req.body;

      let profissional = await tb_profissional.findByPk(id_profissional);

      if (!profissional) {
        return resp
          .status(404)
          .json({ message: "Profissional não encontrado!" });
      }

      await profissional.update({
        nm_prof: nm_prof,
        nm_sobrenome: nm_sobrenome,
        ds_email: email,
        nr_senha: senha,
        dt_nascimento: dt_nascimento,
      });

      profissional = await tb_profissional.findByPk(id_profissional);
      return resp.status(200).json(profissional);
    } catch (error) {
      console.error("Erro na consulta:", error);
      return resp
        .status(500)
        .json({ message: "Erro interno do servidor ao editar Profissional!" });
    }
  },
  getprofissionalsAndItsContact: async (req, resp) => {
    try {
      const resultBusca = await tb_profissional.findAll({
        include: {
          model: authlogin,
          required: true,
        },
      });
      if (resultBusca.length == 0)
        return resp
          .status(404)
          .json({
            message: "Profissionals contendo contatos não encontrados!",
          });
      return resp.status(200).json(resultBusca);
    } catch (erro) {
      console.log("Erro na consulta: ", erro);
      return resp.status(400).json({ message: "Erro na consulta realizada!" });
    }
  },
  createNewprofissional: async (req, resp) => {
    try {
      const { nm_prof, nm_sobrenome, email, senha, dt_nascimento } = req.body;

      const profissional_criado = await tb_profissional.create({
        nm_prof: nm_prof,
        nm_sobrenome: nm_sobrenome,
        ds_email: email,
        nr_senha: senha,
        dt_nascimento: dt_nascimento,
      });

      return resp.json(profissional_criado);
    } catch (erro) {
      console.error("Erro na consulta:", erro);
      return resp.status(400).json({ message: "Erro na consulta realizada!" });
    }
  },
  deleteprofissionalById: async (req, resp) => {
    try {
      const { id_profissional } = req.params;

      const profissional = await tb_profissional.findByPk(id_profissional);

      if (!profissional) {
        return resp
          .status(404)
          .json({ message: "Profissional não encontrado!" });
      }

      await profissional.destroy();

      return resp.json({
        message: `Profissional com id = ${id_profissional} deletado.`,
      });
    } catch (erro) {
      console.error("Erro na consulta:", erro);
      return resp.status(400).json({ message: "Erro na consulta realizada!" });
    }
  },
  deleteSetOfprofissionalsByIds: async (req, resp) => {
    try {
      const { id_init, id_final } = req.params;

      const profissional_apagar = await tb_profissional.findAll({
        where: {
          id_profissional: {
            [Op.between]: [id_init, id_final],
          },
        },
      });

      if (profissional_apagar.length === 0) {
        return resp.status(404).json({
          message: `Não há Profissionals entre uma lista de ids entre ${id_init} e ${id_final}`,
        });
      }

      for (const profissional of profissional_apagar) {
        await profissional.destroy();
      }

      return resp.json({
        message: `Todos os Profissionals entre os de id ${id_init} e ${id_final} apagados!`,
      });
    } catch (erro) {
      console.error("Erro na consulta:", erro);
      return resp.status(400).json({ message: "Erro na consulta realizada!" });
    }
  },
};
