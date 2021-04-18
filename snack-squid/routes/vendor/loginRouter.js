const express = require('express')
const loginRouter = express.Router()
const vanController = require('../../controllers/vendor/vanController')

loginRouter.post('/', vanController.login)

module.exports = loginRouter