const mongoose = require('mongoose')

// Van model
const vanSchema = new mongoose.Schema({
    van_name: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    email_address: { type: String, required: true },
    mobile_number: { type: String, required: true },
    location: String,
    open: Boolean
})

const cartSchema = new mongoose.Schema([{
    foodId: { type: String, ref: 'menu' },
    quality: { type: Number, required: true }

}])

const orderSchema = new mongoose.Schema({
    order_time: { type: Date, default: Date.now },
    fulfilled: { type: Boolean, default: false },
    van_name: { type: String, ref: 'vans' },
    customer_name: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },
    details: cartSchema
})

const Van = mongoose.model('Van', vanSchema)
const Order = mongoose.model('Order', orderSchema)
module.exports = { Van, Order }