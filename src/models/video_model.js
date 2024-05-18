const { connSequelize } = require("../config/bdConnection.js");
const { _padraoTableDBExistente } = require("../../config/configTabelasDB");
const { Sequelize, DataTypes } = require("sequelize");
const { tb_profissional } = require("./prof_model");
const { tb_aula } = require("./aula_model");
const { tb_categoria } = require("./categ_model");

const tb_videos = connSequelize.define(
  "tb_videos",
  {
    id_aula: {
      type: DataTypes.INTEGER,
      references: {
        model: "tb_aula",
        key: "id_aula",
      },
    },
    nm_arquivo: {
      type: DataTypes.STRING(100),
    },
    arquivo: {
      type: DataTypes.BLOB,
    },
    email: {
      type: DataTypes.STRING(100),
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    id_profissional: {
      type: DataTypes.INTEGER,
      references: {
        model: "tb_profissional",
        key: "id_profissional",
      },
      id_categoria: {
        type: DataTypes.INTEGER,
        references: {
          model: "tb_categoria",
          key: "id_categoria",
        },
      },
    },
  },
  _padraoTableDBExistente("tb_videos")
);

tb_aula.hasMany(tb_videos, { foreignKey: "id_aula" });
tb_videos.belongsTo(tb_aula, { foreignKey: "id_aula" });

tb_profissional.hasMany(tb_videos, { foreignKey: "id_profissional" });
tb_videos.belongsTo(tb_profissional, { foreignKey: "id_profissional" });

tb_categoria.hasMany(tb_videos, { foreignKey: "id_categoria" });
tb_videos.belongsTo(tb_categoria, { foreignKey: "id_categoria" });

module.exports = {
  tb_videos,
};
