const { connSequelize } = require('../config/bdConnection.js')
const { _padraoTableDBExistente } = require('../config/configTabelasDB')
const { Sequelize, DataTypes } = require('sequelize')

const tb_profissional = connSequelize.define('tb_profissional', {
  id_profissional: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  email: {
    type: DataTypes.STRING(100),
  },
  senha: {
    type:DataTypes.STRING(255),
  },
  dt_nascimento: DataTypes.DATE
}, _padraoTableDBExistente('tb_profissional'));

module.exports = { 
  tb_profissional
}