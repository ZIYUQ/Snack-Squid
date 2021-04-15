const express = require('express')
const menuController = require('../controllers/menuController')
const orderController = require('../controllers/orderController')
const path = require("path");

const router = express.Router()

router.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../views/menu.html'))
})

router.get('/:name', menuController.getDetails)

router.post('/order', orderController.placeOrder);

module.exports = router