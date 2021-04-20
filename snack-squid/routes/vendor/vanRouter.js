const express = require('express')
    //add vanRouter
const vanRouter = express.Router()
const vanController = require('../../controllers/vendor/vanController')
    // find the van by name
vanRouter.get('/:van_name', vanController.getVanByName)

// get all vans
vanRouter.get('/', vanController.getAllVan)

// add a new van
vanRouter.post('/addvan', vanController.addVan)
module.exports = vanRouter