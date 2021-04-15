const express = require("express")

const orderRouter = express.Router()
const orderController = require('../controllers/orderController')

// add food to cart
orderRouter.get('/order', orderController.placeOrder)

orderRouter.get('/', orderController.viewCart)

orderRouter.post('/', orderController.addToCart)

module.exports = orderRouter