const { Customer } = require('../model/customer')

// express-validator, to validate user data in forms
const expressValidator = require('express-validator')

const login = async(req, res) => {
    let username = req.body.email_address
    let password = req.body.password
}


module.exports = { login }
