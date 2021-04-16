const express = require('express')
const orderRouter = express.Router()
const orderController = require('../controllers/orderControllers')

orderRouter.get('/name=:van_name', orderController.getVanOrder)

orderRouter.get('/', orderController.getAllOrder)

orderRouter.post('/name:van_name', orderController.fulfillOrder)
module.exports = orderRouter