const { connSequelize } = require("../config/bdConnection.js");
const { _padraoTableDBExistente } = require("../../config/configTabelasDB");
const { Sequelize, DataTypes } = require("sequelize");
const { tb_usuario } = require("../models/usu_model.js");

const tb_estado = connSequelize.define(
  "tb_nivel",
  {
    id_estado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nm_estado: {
      type: DataTypes.ENUM("SP", "RJ"),
    },
  },
  _padraoTableDBExistente("tb_estado")
);

tb_usuario.hasMany(tb_estado, { foreignKey: "id_usuario" });
tb_estado.belongsTo(tb_usuario, { foreignKey: "id_usuario" });

module.exports = {
  tb_estado,
};
