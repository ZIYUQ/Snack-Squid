const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    givenName: { type: String, required: true },
    familyName: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orders' }]
})

const Customer = mongoose.model("Customer", customerSchema)

module.exports = { Customer }