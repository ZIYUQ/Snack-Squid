const mongoose = require("mongoose")

// menu model
const menuSchema = new mongoose.Schema({
    name: { type: String, require: true },
    price: { type: Number, require: true },
    photo: String,
    type: String,
    description: String
})

const customerSchema = new mongoose.Schema({
    givenName: { type: String, required: true },
    familyName: { type: String, required: true },
    email_address: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const orderSchema = new mongoose.Schema({
    orderDetail: [{
        food: { type: String, required: true },
        quantity: { type: Number, default: 1 }
    }],
    order_time: { type: Date, default: Date.now },
    fulfilled: { tyepe: Boolean, default: false },
    van: { type: mongoose.Schema.Types.ObjectId, ref: 'vans' },
    customer_name: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' }
})

const menu = mongoose.model("menu", menuSchema)
const customer = mongoose.model("customer", customerSchema)
const order = mongoose.model('order', orderSchema)

module.exports = { menu, customer, order }