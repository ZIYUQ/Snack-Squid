const express = require('express')
const openRouter = express.Router()
const openController = require('../controllers/openController')

//openRouter.get('/', openController.findOpenByVan)
// open the van by finding the name of the van
openRouter.post('/', openController.openForBusiness)


module.exports = openRouter