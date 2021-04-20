const express = require('express')
const openRouter = express.Router()
const openController = require('../../controllers/vendor/openController')

openRouter.get('/', openController.findAllOpen)
    // open the van by finding the name of the van
openRouter.post('/name=:vanName', openController.openForBusiness)


module.exports = openRouter