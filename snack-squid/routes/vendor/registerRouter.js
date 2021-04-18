const express = require('express')
const registerRouter = express.Router()
const vanController = require('../../controllers/vendor/vanController')

registerRouter.post('/', vanController.addVan)

module.exports = registerRouter