const { Customers } = require('../models/customers')

const getAllCustomers = async(req, res) => {
    let result = await Customers.find({}, {givenName: true, familyName: true, email_address: true})
    res.send(result)
}

const getCustomerByEmail = async(req, res) => {
    let result = await Customers.find({email_address: req.body.name}, {})
    res.send(result)
}

const login = async(req, res) => {
    let result = await Customers.find({email_address: req.body.name, password: req.body.name}, {})
    res.send(result)
}

module.exports = {
    getAllCustomers,
    getCustomerByEmail,
    login
}
