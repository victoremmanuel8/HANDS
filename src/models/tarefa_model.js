const { connSequelize } = require('../config/bdConnection.js')
const { _padraoTableDBExistente } = require('../../config/configTabelasDB')
const { Sequelize, DataTypes } = require('sequelize')
const { tb_usuario } = require('../models/usu_model.js');
const { tb_aula } = require('../models/aula_model.js');


const tb_tarefa = connSequelize.define('tb_tarefa', {
  id_tarefa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  id_aula: {
      type: DataTypes.INTEGER,
      references: {
          model: 'tb_aula',
          key: 'id_aula'
      }
  },
  id_usuario: {
      type: DataTypes.INTEGER,
      references: {
      model: 'tb_usuario',
       key: 'id_usuario'
  }
},
  descricao: DataTypes.STRING(100),
  status: DataTypes.ENUM('pendente', 'completo'),
  dt_prazo: DataTypes.DATE      
      },
_padraoTableDBExistente('tb_tarefa'));

tb_aula.hasMany(tb_tarefa, { foreignKey: 'id_aula' });
tb_tarefa.belongsTo(tb_aula, { foreignKey: 'id_aula'});

tb_usuario.hasMany(tb_tarefa, { foreignKey: 'id_usuario' });
tb_tarefa.belongsTo(tb_usuario, {foreignKey: 'id_usuario'});

module.exports = { 
  tb_tarefa
}