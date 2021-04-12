const express = require('express')
    //add vanRouter
const vanRouter = express.Router()
const vanController = require('../controllers/vanController')
vanRouter.get('/:name', vanController.getVanByName)
vanRouter.get('/', vanController.getAllVan)
module.exports = vanRouter