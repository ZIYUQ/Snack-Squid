const express = require('express')
const openRouter = express.Router()
const openController = require('../../controllers/vendor/openController')

// open the van by finding the name of the van
openRouter.post('/open', openController.openForBusiness)
openRouter.get('/', openController.checkLocation)
openRouter.post('/', openController.updategeoLocation)
module.exports = openRouter