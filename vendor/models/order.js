const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    _id: false,
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
    customerId: { type: mongoose.Types.ObjectId, required: true, ref: "Customer" },
    // givenName: { type: String },
    // familyName: { type: String },
    // emailAddress: { type: String }

    vanId: { type: mongoose.Types.ObjectId, required: true, ref: "Van" },
    // vanName: { type: String }

    orderTime: { type: Date, default: Date.now, required: false },
    status: { type: String, enum: ["preparing", "fulfilled", "completed", "cancelled"] },
    details: { type: [cartSchema], required: true },
    total: { type: Number },
    timestamp: { type: Number, default: 10, required: false },
    discount: { type: Boolean, default: false, required: false },
    feedback: { type: feedbackSchema },
})

const Order = mongoose.model('Order', orderSchema)
const Cart = mongoose.model('Cart', cartSchema)

module.exports = { Order, Cart }