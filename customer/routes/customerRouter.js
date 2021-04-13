const express = require("express")

const customerRouter = express.Router()
const customerController = require('../controllers/customerController')

customerRouter.get('/', customerController.getAllCustomer)

// get info of customer
customerRouter.get('/:givenName', customerController.getCustomerByName)

// add new customer
customerRouter.post('/signup', customerController.addNewCustomer)

module.exports = customerRouter