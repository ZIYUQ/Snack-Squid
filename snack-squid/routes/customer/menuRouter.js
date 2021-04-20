const express = require("express")
const menuController = require('../../controllers/customer/menuController')
const orderController = require('../../controllers/customer/orderController')

const router = express.Router()

// show menu page
router.get('/', (req, res) => menuController.getMenu(req, res))

// get details of food
router.get('/:tag', menuController.getFoodDetails)

// place order
router.post('/', orderController.placeOrder)

module.exports = router