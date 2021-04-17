const { Customer } = require('../model/customer')

const login = async(req, res) => {
    let username = req.body.email_address
    let password = req.body.password
}


module.exports = { login }