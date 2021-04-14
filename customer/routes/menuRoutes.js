const express = require('express')
const controller = require('../controllers/menuController')
const path = require("path");

const router = express.Router()

//router.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, '../views/menu.html'))
//})

router.get('/', controller.getAllMenu)

router.get('/:name', controller.getDetails)


module.exports = router