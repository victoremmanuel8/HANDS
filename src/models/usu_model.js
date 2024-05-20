const { connSequelize } = require("../config/bdConnection.js");
const { _padraoTableDBExistente } = require("../config/configTabelasDB");
const { Sequelize, DataTypes } = require("sequelize");

const tb_usuario = connSequelize.define(
  "tb_usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nm_usuario: {
      type: DataTypes.STRING(100),
    },
    nm_sobrenome: {
      type: DataTypes.STRING(100),
    },
    ds_email: {
      type: DataTypes.STRING(100),
    },
    nr_senha: {
      type: DataTypes.STRING(100),
    },
    dt_nascimento: {
      type: DataTypes.DATE,
    },
    nr_idade: {
      type: DataTypes.INTEGER,
    },
    nm_nivel: {
      type: DataTypes.ENUM("Basico", "Intermediario", "Avancado"),
      defaultValue: "Basico",
    },
    sessionTime: {
      type: DataTypes.TIME,
    },
    sg_sexo: {
      type: DataTypes.ENUM("M", "F"),
    },
  },
  _padraoTableDBExistente("tb_usuario")
);

module.exports = {
  tb_usuario,
};
