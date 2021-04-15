const express = require("express")

const orderRouter = express.Router()
const orderController = require('../controllers/orderController')

// add food to cart
orderRouter.post('/', orderController.addToCart)

orderRouter.get('/order', orderController.placeOrder)

orderRouter.get('/', orderController.viewCart)
module.exports = orderRouter