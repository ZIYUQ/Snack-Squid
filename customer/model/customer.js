const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    givenName: { type: String, required: true },
    familyName: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //orders: { type: mongoose.Schema.Types.ObjectId, ref: 'order' }
})

const Customer = mongoose.model("customer", customerSchema)

module.exports = { Customer }