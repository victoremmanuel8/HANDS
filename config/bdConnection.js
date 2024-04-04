    const {Sequelize} = require ('sequelize')
    const usuario =  'root'
    const senha = 'eytfetRKZCiGTVzfETRqziAwVWAcgGsx'
    const nmDB = 'railway'
    const connSequelize =  new Sequelize(
        `mysql:${usuario}:${senha}@roundhouse.proxy.rlwy.net:32065/${nmDB}`//porta 3307(escola) ou 3306 (casa)z
    )

    module.exports = {
        connSequelize,
        nmDB
    }