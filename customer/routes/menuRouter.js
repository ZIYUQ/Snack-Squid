const express = require("express")
const path = require("path");
const menuController = require('../controllers/menuController')
const orderController = require('../controllers/orderController')

const router = express.Router()

// show menu page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/menu.html'))
})

// get details of food
router.get('/:food_name', menuController.getMenuDetails)

// place order
router.post('/', orderController.placeOrder)

module.exports = router