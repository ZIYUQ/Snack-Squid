const mongoose = require('mongoose')
const db = require('../db')

const orderSchema = new mongoose.Schema({
    givenName: {type: String, require:true},
    familyName:{type: String, require:true},
    email_address:String,
    password: String
})

const Orders = mongoose.model("orders", customerSchema)

module.exports = { Orders }