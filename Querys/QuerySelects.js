const { connSequelize } = require('../config/bdConnection')
const { Model, Op, Sequelize } = require('sequelize')
const { tb_usuario} = require('../models/usu_model.js')
const { tb_profissional } = require('../models/prof_model.js');
const { tb_categoria } = require('../models/categ_model.js');
const { tb_aula } = require('../models/aula_model.js');


connSequelize.sync()


async function runServer() {
    
    /*
    -- /// [Query Original 01]: ///
            
    select * from tb_dono as tbd inner join tb_informacoesContato as tbinfo
        on (tbd.cd_dono = tbinfo.cd_donoContato);
    */


    let resultBusca =  await tb_usuario.findAll({
        raw: true
    })

    console.log(resultBusca)




resultBusca = await tb_usuario.findAll({
    attributes:[
        'nm_nome',
        'dt_nascimento'
    ],
    order:[
        Sequelize.literal('dt_nascimento DESC')
    ],
    raw:true
  })

console.log(resultBusca)

}

runServer()

