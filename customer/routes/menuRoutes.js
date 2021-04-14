const express = require('express')
const controller = require('../controllers/menuController')
const path = require("path");

const router = express.Router()

router.get('/', controller.getAllMenu)

router.get('/:name', controller.getDetails)

module.exports = router