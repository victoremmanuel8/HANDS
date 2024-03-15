const { raw } = require('body-parser')
const { tb_usuario } = require('../models/usu_model.js')
const { Sequelize, Op } = require('sequelize')

// **************************************************************************
// AVISO IMPORTANTE:
// **************************************************************************
// Código abaixo não está sendo usado por nada,
// porém não possui o Try-Catch, sendo a forma
// como estudantes estavam acostumados (porém isso é ruim  no caso, pois
// o Try-Catch impede que o servidor/site pare caso o usuário faça alguma
// chamada indevida).
// **************************************************************************
// Aluno pode fazer dessa forma se desejar, mas sabendo que dessa forma
// caso qualquer consulta dê erro devido a problema X ou Y, o site irá
// congelar instantâneamente!
// **************************************************************************

module.exports = {
    getAllusuarios: async (req, resp) => {
        const Allusuario = await tb_usuario.findAll()
        return resp.json(Allusuario)        
    },
    getusuarioById: async (req, resp) => {
        const { id_usuario } = req.params
        const usuario = await tb_usuario.findByPk(id_usuario)
        
        if (!usuario) 
            return resp.json({ message: 'usuario não encontrado!' })
        else 
            return resp.json(usuario)
    },
    editusuarioById: async (req, resp) => {
        const { id_usuario } = req.params
        const { nm_nome, nm_sobrenome, email, cd_cpf, senha, dt_nascimento } = req.body

        const usuarioAchado = await tb_usuario.findByPk(id_usuario)

        if(!usuarioAchado) {
            return resp.status(404).json({ message: 'usuario não encontrado!' })
        }

        usuarioAchado.nm_usuario = nm_nome
        usuarioAchado.nm_sobrenome = nm_sobrenome
        usuarioAchado.email = email
        usuarioAchado.cd_cpf = cd_cpf
        usuarioAchado.senha = senha
        usuarioAchado.dt_nascimento = dt_nascimento

        const usuarioEditado = await usuarioAchado.save()
        
        return resp.json(usuarioEditado)
    },
    getusuariosAndItsContact: async (req, resp) => {
        const resultBusca =  await tb_usuario.findAll({
            include: {
                model: authlogin,
                required: true
            }
        })

        return resp.json(resultBusca)
    },
    /*
    getAndCountusuariosByTheirSexinCountry: async (req, resp) => {
        const resultBusca = await usuario.findAll({
            where: {
                nm_paisOrigem: { 
                    [Op.in]: [
                        'Brasil', 
                        'Estados Unidos', 
                        'Austrália'
                    ] 
                }
            },
            attributes: [
                'nm_nome', 
                'email',
                [ Sequelize.fn('COUNT', Sequelize.col('*')), 'QTD total:' ]
            ],
            group: [ 'nm_nome', 'email' ],
        })

        return resp.json(resultBusca)
    }, */

    //criar
    createNewusuario: async (req, resp) => {
        const { 
            nm_nome, 
            nm_sobrenome, 
            email, 
            cd_cpf,
            senha,
            dt_nascimento
        } = req.body

        const usuarioCriado =  await tb_usuario.create({
            nm_usuario: nm_nome,
            nm_sobrenome: nm_sobrenome,
            email: email,
            cd_cpf: cd_cpf,
            senha: senha,
            dt_nascimento: dt_nascimento
        })
        
        return resp.json(usuarioCriado)
    },

    //deletar
    deleteusuariobyId: async (req, resp) => {
        const { id_usuario } = req.params

        const usuarioAchado = await tb_usuario.findByPk(id_usuario)

        if (!usuarioAchado) {
            return resp.json({ message: 'usuario não encontrado!' })
        }

        await usuarioAchado.destroy()

        return resp.json({ message: `usuario com id = ${id_usuario} deletado.` })
    },
    deleteSetOfusuariosByIds: async (req, resp) => {
        const { id_init, id_final } = req.params 

        const usuariosPraApagar = await tb_usuario.findAll({
            where: {
                id_usuario: {
                    [Op.between]: [id_init, id_final]
                }
            }
        })

        if (usuariosPraApagar.length === 0) {
            return resp.status(404).json({ 
                message: `Não há usuarios entre uma lista de ids entre ${id_init} e ${id_final}`
            })
        }

        for (const usuario of usuariosPraApagar) {
            await usuario.destroy()
        }

        return resp.json({ 
            message: `Todos os usuarios entre os de id ${id_init} e ${id_final} apagados!` 
        })
    }
}

