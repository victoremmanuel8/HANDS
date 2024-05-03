const { connSequelize } = require('../../config/bdConnection.js')
const { _padraoTableDBExistente } = require('../../config/configTabelasDB.js')
const { Sequelize, DataTypes } = require('sequelize')

const tb_categoria = connSequelize.define('tb_categoria', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nm_categoria: DataTypes.STRING(50)
}, 
_padraoTableDBExistente('tb_categoria'));

module.exports = { 
  tb_categoria
}