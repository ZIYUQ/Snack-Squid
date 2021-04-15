const mongoose = require('mongoose')
const db = require('../db')

const orderSchema = new mongoose.Schema({
    orderDetail: [{food:{type: String, required:true}, quantity: {type: Number, default: 1}}],
    order_time: {type: Date, default: Date.now},
    fulfilled: {type: Boolean, default: false},
    van:{type: mongoose.Schema.Types.ObjectId, ref: 'vans'},
    customer_name: {type: mongoose.Schema.Types.ObjectId, ref: 'customer'}
})

const Orders = mongoose.model("orders", orderSchema)

module.exports = { Orders }