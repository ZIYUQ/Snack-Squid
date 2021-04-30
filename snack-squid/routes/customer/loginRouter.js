const express = require("express")

const router = express.Router()
const customerController = require("../../controllers/customer/customerController")

router.get('', customerController.renderLoginPage)

// customer login
router.post('', customerController.login)

module.exports = router