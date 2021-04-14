const mongoose = require('mongoose')
const db = require('../db')

const customerSchema = new mongoose.Schema({
    givenName: {type: String, require:true},
    familyName:{type: String, require:true},
    email_address:String,
    password: String
})

const Customers = mongoose.model("customers", customerSchema)

module.exports = { Customers }