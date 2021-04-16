const express = require('express')
const loginRouter = express.Router()
const vanController = require('../controllers/vanController')

loginRouter.post('/', vanController.login)

module.exports = loginRouter