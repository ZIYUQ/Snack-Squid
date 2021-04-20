const express = require('express')
const orderRouter = express.Router()
const orderController = require('../../controllers/vendor/orderController')

orderRouter.get('/name=:vanName', orderController.getVanOrder)

orderRouter.get('/', orderController.getAllOrder)

orderRouter.post('/name:vanName', orderController.fulfillOrder)
module.exports = orderRouter