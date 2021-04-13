const express = require('express')
    //add vanRouter
const vanRouter = express.Router()
const vanController = require('../controllers/vanController')
    // find the van by name
vanRouter.get('/:name', vanController.getVanByName)

// get all vans
vanRouter.get('/', vanController.getAllVan)

// add a new van
vanRouter.post('/addvan', vanController.addVan)
module.exports = vanRouter