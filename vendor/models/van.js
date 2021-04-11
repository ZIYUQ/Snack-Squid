const mongoose = require('mongoose')
const db = require('../db')

const vanSchema = new mongoose.Schema({
    van_name: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    email_address: { type: String },
    mobile_number: { type: String },
    location: { type: String }
})

const Van = mongoose.model('Van', vanSchema)