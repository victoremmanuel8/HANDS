 const {Sequelize} = require ('sequelize')
 const usuario = 'root'
 const senha = 'root'
 const nmDB = 'hands_db'
 const connSequelize =  new Sequelize(
     `mysql:${usuario}:${senha}@localhost:3307/${nmDB}` //porta 3307(escola) ou 3306 (casa)
 )

 module.exports = {
     connSequelize,
     nmDB
 }