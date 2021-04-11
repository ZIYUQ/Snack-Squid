const express = require('express')
    //add vanRouter
const vanRouter = express.Router()
const vanController = require('../controllers/vanController')
    // require the van controller
vanRouter.get('/', vanController.getAllVans)
vanRouter.post('/', vanController.addVan)
module.exports = vanRouter