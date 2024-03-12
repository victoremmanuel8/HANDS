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

const tb_profissional = connSequelize.define('tb_profissional', {
    id_profissional: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nm_prof: DataTypes.STRING(100),
    nm_profissional: DataTypes.STRING(100),
    nm_sobrenome: DataTypes.STRING(100),
    cd_rg: {
      type: DataTypes.INTEGER
    },
    email: DataTypes.STRING(100),
    senha: DataTypes.STRING(100),
    dt_nascimento: DataTypes.DATE
}, _padraoTableDBExistente('tb_profissional'));

const tb_categoria = connSequelize.define('tb_categoria', {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nm_nome: DataTypes.STRING(50)
  }, 
_padraoTableDBExistente('tb_categoria'));

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


tb_profissional.hasMany( tb_aula, { foreignKey: 'id_prof' });

tb_aula.hasMany(tb_tarefa, { foreignKey: 'id_aula' });

tb_usuario.hasMany(tb_tarefa, { foreignKey: 'id_usuario' });



module.exports = { 
    tb_usuario, 
    tb_profissional, 
    tb_categoria,
    tb_aula, 
    tb_tarefa, 
}
