const { raw } = require('body-parser')
const { tb_usuario } = require('../models/usu_model.js')
const { Sequelize, Op } = require('sequelize')

module.exports = {
    getAllusuarios: async (req, resp) => {
        try {
            const Allusuarios = await tb_usuario.findAll()
            if (!Allusuarios) 
                return resp.status(404).json({ message: 'Usuário não encontrado!' })
            return resp.status(200).json(Allusuarios) 
        }       
        catch(erro) {
            console.log('Erro na consulta: ', erro)
            res.status(500).json({ message: 'Erro interno do servidor!' });
        }
    },
    getusuarioById: async (req, resp) => {
        try {
            const { id_usuario } = req.params
            const usuario = await tb_usuario.findByPk(id_usuario)
            
            if (!usuario) 
                return resp.status(404).json({ message: 'Usuário não encontrado!' })
            else 
                return resp.status(200).json(usuario) 
        }
        catch(erro) { 
            console.log('Erro na consulta: ', erro)
            return resp.status(400).json({ message: 'Erro na consulta realizada!' }) 
        }
    },
    editusuarioById: async (req, resp) => {
            const { id_usuario } = req.params
            const { nm_nome, nm_sobrenome, email, senha, dt_nascimento } = req.body

            const usuario = await tb_usuario.findByPk(id_usuario)

            usuario.nm_usuario = nm_nome
            usuario.nm_sobrenome_usuario = nm_sobrenome
            usuario.email_usuario = email
            usuario.senha_usuario = senha
            usuario.dt_nasci_usuario = dt_nascimento

            if(!usuario)
                return resp.status(404).json({ message: 'Usuário não encontrado!' })

            const usuarioEditado = await usuario.save()         
            return resp.status(200).json(usuarioEditado)
        },
    getusuariosAndItsContact: async (req, resp) => {
        try {
            const resultBusca =  await tb_usuario.findAll({
                include: {
                    model: authlogin,
                    required: true
                }
            })
            if (resultBusca.length == 0)
                return resp.status(404).json({ message: 'Usuários contendo contatos não encontrados!' })   
            return resp.status(200).json(resultBusca)
        }
        catch(erro) { 
            console.log('Erro na consulta: ', erro)
            return resp.status(400).json({ message: 'Erro na consulta realizada!' }) 
        }
    },
    createNewusuario: async (req, resp) => {
        try {
            const { 
                nm_nome, 
                nm_sobrenome, 
                email, 
                senha,
                dt_nascimento
            } = req.body
    
            const usuario_criado =  await tb_usuario.create({
                nm_nome: nm_nome,
                nm_sobrenome: nm_sobrenome,
                email: email,
                senha: senha,
                dt_nascimento: dt_nascimento
            })
            
            return resp.json(usuario_criado)
        }
        catch(erro) {
            console.error('Erro na consulta:', erro)
            return resp.status(400).json({ message: 'Erro na consulta realizada!' })
        }
    },
    deleteusuarioById: async (req, resp) => {
        try {
            const { id_usuario } = req.params

            const usuario = await tb_usuario.findByPk(id_usuario)

            if (!usuario) {
                return resp.status(404).json({ message: 'Usuário não encontrado!' })
            }

            await usuario.destroy()

            return resp.json({ message: `Usuário com id = ${id_usuario} deletado.` })
        }
        catch(erro) {
            console.error('Erro na consulta:', erro)
            return resp.status(400).json({ message: 'Erro na consulta realizada!' })
        }
    },
    deleteSetOfusuariosByIds: async (req, resp) => {
        try {
            const { id_init, id_final } = req.params 

            const usuario_apagar = await tb_usuario.findAll({
                where: {
                    id_usuario: {
                        [Op.between]: [id_init, id_final]
                    }
                }
            })

            if (usuario_apagar.length === 0) {
                return resp.status(404).json({ 
                    message: `Não há usuários entre uma lista de ids entre ${id_init} e ${id_final}`
                })
            }

            for (const usuario of usuario_apagar) {
                await usuario.destroy()
            }

            return resp.json({ 
                message: `Todos os usuários entre os de id ${id_init} e ${id_final} apagados!` 
            })
        }
        catch(erro) {
            console.error('Erro na consulta:', erro)
            return resp.status(400).json({ message: 'Erro na consulta realizada!' })
        }
    }
}