const mongoose = require('mongoose')
const db = require('../db')

const orderSchema = new mongoose.Schema({
    name: {type: String}
})

const Order = mongoose.model("orders", orderSchema)

module.exports = { Order }