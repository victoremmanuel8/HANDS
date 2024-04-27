const { connSequelize } = require('../config/bdConnection.js')
const { _padraoTableDBExistente } = require('../../config/configTabelasDB')
const { Sequelize, DataTypes } = require('sequelize')

const tb_nivel = connSequelize.define('tb_nivel', {
  id_nivel: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nm_nivel: {
    type: DataTypes.ENUM('Iniciante', 'Intermediario', 'Expert'),
  }
}, 
_padraoTableDBExistente('tb_categoria'));

module.exports = { 
  tb_categoria
}