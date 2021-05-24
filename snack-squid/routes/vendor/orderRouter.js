const express = require('express')
const orderRouter = express.Router()
const orderController = require('../../controllers/vendor/orderController')



orderRouter.get('/', orderController.getOrder)

orderRouter.post('/fulfill-order', orderController.fulfillOrder)
module.exports = orderRouter