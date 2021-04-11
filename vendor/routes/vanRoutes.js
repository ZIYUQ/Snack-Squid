const express = require('express')
    //add vanRouter
const vanRouter = express.Router()
const vanController = require('../controllers/vanController')
    // require the van controller
vanRouter.get('/', vanController.getAllVans)
module.exports = vanRouter