const { connSequelize } = require("../config/bdConnection.js");
const { _padraoTableDBExistente } = require("../config/configTabelasDB");
const { Sequelize, DataTypes } = require("sequelize");

const tb_profissional = connSequelize.define(
  "tb_profissional",
  {
    id_profissional: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nm_prof: {
      type: DataTypes.STRING(100),
    },
    nm_sobrenome: {
      type: DataTypes.STRING(100),
    },
    cd_rg: {
      type: DataTypes.NUMBER(12),
    },
    ds_email: {
      type: DataTypes.STRING(100),
    },
    nr_senha: {
      type: DataTypes.STRING(255),
    },
    dt_nascimento: {
      type: DataTypes.DATE,
    },
    nm_nivel: {
      type: DataTypes.ENUM("Profissional"),
      defaultValue: "Profissional",
    },
    sessionTime: {
      type: DataTypes.TIME,
    },
    sg_sexo: {
      type: DataTypes.ENUM("M", "F"),
    },
  },
  _padraoTableDBExistente("tb_profissional")
);

module.exports = {
  tb_profissional,
};
