const { connSequelize } = require('../config/bdConnection')
const { _padraoTableDBExistente } = require('../config/configTabelasDB')
const { Sequelize, DataTypes } = require('sequelize')

const tb_usuario = connSequelize.define('tb_usuario', {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nm_nome: DataTypes.STRING(100),
    nm_sobrenome: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    senha: DataTypes.STRING(100),
    dt_nascimento: DataTypes.DATE
}, _padraoTableDBExistente('tb_usuario'));


module.exports = { 
    tb_usuario, 
}
