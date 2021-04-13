const express = require('express')
const openRouter = express.Router()
const openController = require('../controllers/openController')

openRouter.get('/', openController.findAllOpen)
    // open the van by finding the name of the van
openRouter.get('/:name', openController.openForBusiness)
module.exports = openRouter