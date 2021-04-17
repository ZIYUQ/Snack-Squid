const express = require("express")
const menuController = require('../controllers/menuController')
const orderController = require('../controllers/orderController')

const router = express.Router()

// show menu page
router.get('/', (req, res) => menuController.getMenu(req, res))

// get details of food
router.get('/:food_name', menuController.getMenuDetails)

// place order
router.post('/', orderController.placeOrder)

module.exports = router