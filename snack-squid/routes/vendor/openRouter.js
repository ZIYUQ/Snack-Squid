const express = require('express')
const openRouter = express.Router()
const openController = require('../../controllers/vendor/openController')

// open the van by finding the name of the van
openRouter.post('/', openController.openForBusiness)
openRouter.get('/', openController.checkLocation)
module.exports = openRouter