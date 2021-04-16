const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    _id: false,
    food_name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1}

})

const feedbackSchema = new mongoose.Schema({
    _id: false,
    ratings: { type: Number, min: 1, max: 5},
    comment: { type: String }
})

const orderSchema = new mongoose.Schema({
    given_name: { type: String },
    family_name: { type: String },
    email_address: { type: String},
    van_name: { type: String },
    order_time: { type: Date , default: Date.now },
    status: { type: String, default: "preparing" },
    details: { type: [cartSchema], required: true },
    total: { type: Number , default:0},
    timestamp: { type: Number , default: 10, required: false },
    discount:{ type: Boolean, default: false, required: false},
    feedback: { type: feedbackSchema },
})

const Order = mongoose.model('order', orderSchema)
const Cart = mongoose.model('cart', cartSchema)

module.exports = { Order, Cart }