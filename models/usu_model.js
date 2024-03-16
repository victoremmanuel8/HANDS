const { connSequelize } = require('../config/bdConnection')
const { _padraoTableDBExistente } = require('../config/configTabelasDB')
const { Sequelize, DataTypes } = require('sequelize')

const tb_usuario = connSequelize.define('tb_usuario', {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nm_nome: {
      type: DataTypes.STRING(100),
      defaultValue: 'teste'
    },
    nm_sobrenome: {
      type: DataTypes.STRING(100),
      defaultValue: 'teste'
    },
    email: {
      type: DataTypes.STRING(100),
      defaultValue: 'luanhenrique66@gmail.com'
    },
    senha: {
      type: DataTypes.STRING(100),
      defaultValue: '333'
    },
    dt_nascimento: {
      type: DataTypes.DATE,
      defaultValue: '2004-09-09'
    },
}, _padraoTableDBExistente('tb_usuario'));


module.exports = { 
    tb_usuario
}
