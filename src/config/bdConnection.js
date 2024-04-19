 const {Sequelize} = require ('sequelize')
 const usuario = process.env.DATABASE_USER
 const senha = process.env.DATABASE_PASSWORD
 const nmDB = process.env.DATABASE
 const connSequelize =  new Sequelize(
     `mysql:${usuario}:${senha}@localhost:3307/${nmDB}` //porta 3307(escola) ou 3306 (casa)
 )

 module.exports = {
     connSequelize,
     nmDB
 }