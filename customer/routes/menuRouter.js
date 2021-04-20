const express = require("express")
const menuController = require('../controllers/menuController')
const orderController = require('../controllers/orderController')

const router = express.Router()

// show menu page
router.get('/van=:van_name', (req, res) => menuController.getMenu(req, res))

// get details of food
router.get('/food_id=:_id', menuController.getFoodDetails)

// place order
router.post('/van=:van_name', orderController.placeOrder)

module.exports = router