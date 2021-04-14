const mongoose = require('mongoose')

// Van model
const vanSchema = new mongoose.Schema({
    vanId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    email_address: { type: String, required: true, unique: true },
    mobile_number: { type: String, required: true, unique: true },
    location: { type: String },
    open: { type: Boolean }
})

const menuSchema = new mongoose.Schema({})
const orderSchema = new mongoose.Schema({
    vanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Van' },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    foods: [{ menuSchema, quality: { type: String } }]
})

const Van = mongoose.model('Van', vanSchema)
const Order = mongoose.model('Order', orderSchema)
    //const Order = mongoose.model('Order', orderSchema)
module.exports = { Van, Order }