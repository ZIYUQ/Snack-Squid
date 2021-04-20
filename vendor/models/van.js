const mongoose = require('mongoose')

// Van model
const vanSchema = new mongoose.Schema({
    van_name: { type: String, require: true, unique: true },
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


const feedbackSchema = new mongoose.Schema({
    _id: false,
    ratings: { type: Number, min: 1, max: 5 },
    comment: { type: String }
})

const orderSchema = new mongoose.Schema({
    given_name: { type: String },
    family_name: { type: String },
    email_address: { type: String },
    van_name: { type: String },
    order_time: { type: Date, default: Date.now },
    status: String,
    details: { type: [cartSchema], required: true },
    total: { type: Number, required: true },
    timestamp: { type: Number, default: 10, required: false },
    discount: { type: Boolean, default: false, required: false },
    feedback: { type: feedbackSchema },
})

const Van = mongoose.model('Van', vanSchema)
const Order = mongoose.model('Order', orderSchema)
module.exports = { Van, Order }