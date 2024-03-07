const { connSequelize } = require('../config/bdConnection')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../config/configTabelasDB')

const tb_usuario = connSequelize.define('tb_usuario', {
  // Definindo os campos do modelo
  id_usuario: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
},
  nm_nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nm_sobrenome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dt_nascimento: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, 
    
 _padraoTableBDExistence('tb_usuario')

)

module.exports = { 
    tb_usuario 
}

