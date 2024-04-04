const { connSequelize } = require('../config/bdConnection.js')
const { _padraoTableDBExistente } = require('../../config/configTabelasDB')
const { Sequelize, DataTypes } = require('sequelize')
const { tb_profissional } = require('./prof_model.js');
const { tb_categoria} = require('./categ_model.js');

const tb_aula = connSequelize.define('tb_aula', {
  id_aula: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: DataTypes.STRING(50),
  descricao: DataTypes.STRING(200),
  conteudo: DataTypes.DECIMAL(11, 2),
  id_categoria: {
    type: DataTypes.INTEGER,
    references: {
        model: 'tb_categoria',
        key: 'id_categoria'
    }
  },
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

tb_profissional.hasMany( tb_aula, {  foreignKey: 'id_profissional' });
tb_aula.belongsTo(tb_profissional, { foreignKey: 'id_profissional'});

tb_categoria.hasMany( tb_aula, { as: 'tb_categoria', foreignKey: 'id_categoria' });
tb_aula.belongsTo(tb_categoria, {as: 'tb_categoria', foreignKey: 'id_categoria'});

module.exports = { 
  tb_aula
}
