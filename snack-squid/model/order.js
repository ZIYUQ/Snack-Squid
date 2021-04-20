const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    _id: false,
    foodId: { type: mongoose.Types.ObjectId, ref: "menu" },
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 }

})

const feedbackSchema = new mongoose.Schema({
    _id: false,
    ratings: { type: Number, min: 1, max: 5 },
    comment: { type: String }
})

const orderSchema = new mongoose.Schema({
    givenName: { type: String },
    familyName: { type: String },
    emailAddress: { type: String },
    vanName: { type: String },
    orderTime: { type: Date, default: Date.now , required: false},
    status: String,
    details: { type: [cartSchema], required: true },
    total: { type: Number , required: true},
    timestamp: { type: Number , default: 10, required: false },
    discount:{ type: Boolean, default: false, required: false},
    feedback: { type: feedbackSchema },
})

const Order = mongoose.model('order', orderSchema)
const Cart = mongoose.model('cart', cartSchema)

module.exports = { Order, Cart }