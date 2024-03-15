const { connSequelize } = require('../config/bdConnection')
const { _padraoTableDBExistente } = require('../config/configTabelasDB')
const { Sequelize, DataTypes } = require('sequelize')

const tb_profissional = connSequelize.define('tb_profissional', {
  id_profissional: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nm_prof: DataTypes.STRING(100),
  nm_sobrenome: DataTypes.STRING(100),
  cd_rg: DataTypes.NUMBER(12),
  email: DataTypes.STRING(100),
  senha: DataTypes.STRING(100),
  dt_nascimento: DataTypes.DATE
}, _padraoTableDBExistente('tb_profissional'));

module.exports = { 
  tb_profissional
}