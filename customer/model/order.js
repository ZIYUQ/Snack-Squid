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
    order_time: { type: Date , default: Date.now },
    status: { type: String, default: "preparing" },
    van_name: { type: String },
    given_name: { type: String },
    family_name: { type: String },
    email_address: { type: String}},
    // avoid __v
    { versionKey: false
})

const Customer = mongoose.model("customer", customerSchema)
const Order = mongoose.model('order', orderSchema)

module.exports = { Customer, Order }