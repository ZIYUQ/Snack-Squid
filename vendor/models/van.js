const mongoose = require('mongoose')
const db = require('../db')

// Van model
const vanSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    email_address: { type: String, required: true, unique: true },
    mobile_number: { type: String, required: true, unique: true },
    location: { type: String },
    open: { type: Boolean }
})


const orderSchema = new mongoose.Schema({
    vanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Van' }
})

const Van = mongoose.model('Van', vanSchema)
module.exports = { Van }