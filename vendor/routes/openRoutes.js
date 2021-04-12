const express = require('express')
const openRouter = express.Router()
const openController = require('../controllers/openController')

openRouter.get('/:name', openController.openForBusiness)

module.exports = openRouter