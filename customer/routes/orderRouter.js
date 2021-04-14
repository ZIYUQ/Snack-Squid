const express = require("express")

const orderRouter = express.Router()
const orderController = require('../controllers/orderController')

// add food to cart
orderRouter.post('/', orderController.addToCart)

orderRouter.get('/order', orderController.placeOrder)

module.exports = orderRouter