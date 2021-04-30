const express = require("express")

const router = express.Router()
const customerController = require("../../controllers/customer/customerController")

router.get('', customerController.renderSignupPage)

// customer login
router.post('', customerController.signup)

module.exports = router