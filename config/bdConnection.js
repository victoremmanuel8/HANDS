const {Sequelize} = require ('sequelize')

const usuario = 'root'
const senha = '27010206' //senha do banco 27010206
const nmDB = 'hands_db'
const connSequelize =  new Sequelize(
    `mysql://${usuario}:${senha}@localhost:3306/${nmDB}` //porta 3307(escola) ou 3306 (casa)
)

module.exports = {
    connSequelize,
    nmDB
}