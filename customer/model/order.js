const mongoose = require("mongoose")

// menu model
const menuSchema = new mongoose.Schema({
    foodId: Number,
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

const menu = mongoose.model("menu", menuSchema)
const customer = mongoose.model("customer", customerSchema)
const order = mongoose.model('order', orderSchema)
const cart = mongoose.model('cart', cartSchema)
module.exports = { menu, customer, order, cart }