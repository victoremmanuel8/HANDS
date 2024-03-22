const { Router } = require ('express')
const SessionController = require ('../controllers/SessionControllers')
const SessionValidations = require('../validations/Sessionsvalidation')

const publicRoutes = new Router()

publicRoutes.get('/session', SessionValidations.index, SessionController.index)

module.exports = publicRoutes

