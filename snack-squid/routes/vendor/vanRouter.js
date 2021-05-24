const express = require('express')
    //add vanRouter
const vanRouter = express.Router()
const vanController = require('../../controllers/vendor/vanController')
    // find the van by name

module.exports = vanRouter