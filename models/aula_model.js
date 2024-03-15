const { connSequelize } = require('../config/bdConnection')
const { _padraoTableDBExistente } = require('../config/configTabelasDB')
const { Sequelize, DataTypes } = require('sequelize')
const { tb_profissional } = require('../models/prof_model.js');

const tb_aula = connSequelize.define('tb_aula', {
  id_aula: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: DataTypes.STRING(50),
  descricao: DataTypes.STRING(200),
  conteudo: DataTypes.DECIMAL(11, 2),
  id_profissional: {
      type: DataTypes.INTEGER,
      references: {
          model: 'tb_profissional',
          key: 'id_profissional'
      }
  },
  data_publicacao: DataTypes.DATE,
  publica: DataTypes.BOOLEAN
}, 
_padraoTableDBExistente('tb_aula'));

tb_profissional.hasMany( tb_aula, { foreignKey: 'id_prof' });

module.exports = { 
  tb_aula
}
