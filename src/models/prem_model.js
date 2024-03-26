const { connSequelize } = require('../../config/bdConnection')
const { _padraoTableDBExistente } = require('../../config/configTabelasDB')
const { Sequelize, DataTypes } = require('sequelize')
const { tb_usuario } = require('../models/usu_model.js');

const tb_premium = connSequelize.define('tb_premium', {
  id_assinatura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
    model: 'tb_usuario',
     key: 'id_usuario'
}
},
  dt_incio: {
    type: DataTypes.DATE
  },
  dt_fim: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('ativo', 'cancelado'),
  },

},_padraoTableDBExistente('tb_premium'));

tb_usuario.hasMany(tb_premium, { foreignKey: 'id_usuario' });
tb_premium.belongsTo(tb_usuario, {foreignKey: 'id_usuario'});

module.exports = { 
  tb_premium
}