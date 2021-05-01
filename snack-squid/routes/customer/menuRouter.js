const express = require("express")
const menuController = require('../../controllers/customer/menuController')
const orderController = require('../../controllers/customer/orderController')

const router = express.Router()

// show menu page
router.get('/van=:van_name', menuController.getMenu)

// get details of food
router.get('/:tag', menuController.getFoodDetails)

// place order
router.post('/place-order', orderController.placeOrder)

module.exports = router