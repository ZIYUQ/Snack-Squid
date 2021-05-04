const express = require("express")
const menuController = require('../../controllers/customer/menuController')
const orderController = require('../../controllers/customer/orderController')

const menuRouter = express.Router()

// show menu page
menuRouter.get('/van=:van_name', menuController.getMenu)

// get details of food
menuRouter.get('/:tag', menuController.getFoodDetails)

// place order
menuRouter.post('/van=:van_name/place-order', orderController.placeOrder)

module.exports = menuRouter