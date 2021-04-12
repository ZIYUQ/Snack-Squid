const mongoose = require('mongoose')
const db = require('../db')

// Van model
const vanSchema = new mongoose.Schema({
    vanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Van' },
    van_name: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    email_address: { type: String, required: true, unique: true },
    mobile_number: { type: String, required: true, unique: true },
    location: { type: String }
})

const Van = mongoose.model('Van', vanSchema)
module.exports = { Van }