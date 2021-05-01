const express = require("express")

const router = express.Router()
const orderController = require("../../controllers/customer/orderController")

router.get('/:id', orderController.getOrder)

module.exports = router