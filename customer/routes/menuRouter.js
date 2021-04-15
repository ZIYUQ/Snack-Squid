const express = require("express")

const router = express.Router()
const menuController = require('../controllers/menuController')
const orderController = require('../controllers/orderController')

// get menu
router.get('/', menuController.getMenu)

// get detail of food
router.get('/:food_name', menuController.getMenuDetails)

// place order
router.post('/', orderController.placeOrder)

module.exports = router