const { connSequelize } = require('../src/config/bdConnection.js')
const { Model, Op, Sequelize } = require('sequelize')
const { tb_usuario} = require('../src/models/usu_model.js')
const { tb_profissional } = require('../src/models/prof_model.js');
const { tb_categoria } = require('../src/models/categ_model.js');
const { tb_aula } = require('../src/models/aula_model.js');
const { tb_premium } = require('../src/models/prem_model.js');


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

  /*
    -- /// [Query Original 02]: ///
            
    select nm_nome, dt_nascimento from tb_usuario order by dt_nascimento desc
    */


resultBusca = await tb_usuario.findAll({
    attributes:[
       [Sequelize.literal('nm_usuario'), 'Usuario'],
       [Sequelize.literal('dt_nascimento'), 'Nascimento']
    ],
    order:[
        Sequelize.literal('dt_nascimento DESC')
    ],
    raw:true
  })

console.log(resultBusca)

/*
  -- /// [Query Original 03]: ///

  select status, COUNT(*) from tb_premium group by status
*/

resultBusca = await tb_premium.findAll({
    where: { 
        status:{
            [Op.in]:[
                'ativo',
                'cancelado'
            ]
        }
    },
    attributes:[
        [Sequelize.literal('status'), 'status'],       
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'qtd']
    ],
    group:[
        'status'
    ],
    raw:true
  })

console.log(resultBusca)

/*
  -- /// [Query Original 04]: ///

  select id_assinatura, status, COUNT(*) 'qtd' from tb_premium group by id_assinatura, status order by id_assinatura desc
*/

resultBusca = await tb_premium.findAll({
    where: {
        status:{
            [Op.in]:[
                'ativo',
                'cancelado'
            ]
        }
    },
    attributes:[
        [Sequelize.literal('status'), 'status'],
        [Sequelize.literal('id_assinatura'), 'assinatura'],
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'qtd']
    ],
    order:[
        Sequelize.literal(' id_assinatura DESC')
    ],
    group:[
        'id_assinatura',
        'status',
    ],
    raw:true
  })

console.log(resultBusca)

/*
  -- /// [Query Original 05]: ///

  select  nm_nome, status from tb_premium inner join tb_usuario on (tb_usuario.id_usuario = tb_premium.id_usuario)
*/

resultBusca = await tb_premium.findAll({
    attributes:[
       [Sequelize.literal('status'), 'status'],
       [Sequelize.literal('nm_usuario'), 'Usuario']
    ],
    include:{
        model: tb_usuario,
        required: true,
        attributes: []
    },
    raw:true
  })

console.log(resultBusca)

/*
  -- /// [Query Original 06]: ///

    select tb_aula.titulo, tb_profissional.id_profissional, tb_profissional.nm_prof, tb_profissional.nm_sobrenome, tb_categoria.nm_categoria from tb_aula inner join tb_profissional on tb_aula.tb_profissional_id = tb_profissional.id inner join  tb_categoria on tb_aula.tb_categoria_id = tb_categoria.id
*/

resultBusca = await tb_aula.findAll({
    attributes:[
        [Sequelize.literal('titulo'), 'titulo'],
        [Sequelize.literal('nm_prof'),'Nome'], 
        [Sequelize.literal('nm_sobrenome'),'Sobrenome'],
        [Sequelize.literal('nm_categoria'), 'Categoria']
    ],
    include:[{
        model: tb_profissional,
        required: true,
        attributes: []
    }, {
        model: tb_categoria,
        required: true,
        as: 'tb_categoria',
        attributes:[]
    }],
    raw:true
  })

console.log(resultBusca)

/*
  -- /// [Query Original 07]: ///

  select  id_usuario, status, count(*) 'qtd' from tb_premium inner join tb_usuario on (tb_usuario.id_usuario = tb_premium.id_usuario) group by id_usuario, status order by id_usuario desc
*/

resultBusca = await tb_premium.findAll({
    attributes: [
        [Sequelize.literal('status'), 'status'],       
        [Sequelize.literal('nm_usuario'), 'Nome'],
        [Sequelize.literal('dt_fim'), 'Data_Fim']
    ],
    include:{
        model: tb_usuario,
        attributes: [],
        required: true,
    },
    order: [
        [Sequelize.literal('dt_fim DESC')]
],
    group:[
        'nm_usuario',
        'status',
        'dt_fim'
    ],
    raw:true
})

console.log(resultBusca)

}

runServer()

