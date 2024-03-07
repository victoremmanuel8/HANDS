const { connSequelize } = require('../config/bdConnection')
const { DataTypes} = require ('sequelize')
const { _padraoTableBDExistence } = require('../config/configTabelasDB')


//arrumar aqui mais tarde 

const tb_profissional = connSequelize.define('tb_profissional', {
  // Definindo os campos do modelo
    id_profissional: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
},
    id_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: false,
        foreingKey: true,
        allowNull: true
    },
  nm_prof: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nm_sobrenome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cd_cpf: {
    type: DataTypes.NUMBER,
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
    
 _padraoTableBDExistence('tb_profissional')

)

module.exports = { 
    tb_profissional
}

