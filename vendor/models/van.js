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


const orderSchema = new mongoose.Schema({
    orderDetail: [{
        foodId: { type: Number, ref: 'menu' },
        quantity: { type: Number, default: 1 }
    }],
    order_time: { type: Date, default: Date.now },
    fulfilled: { tyepe: Boolean, default: false },
    van: { type: mongoose.Schema.Types.ObjectId, ref: 'vans' },
    customer_name: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' }
})

const Van = mongoose.model('Van', vanSchema)
const Order = mongoose.model('Order', orderSchema)
module.exports = { Van, Order }