const mongoose = require('mongoose')

// Van model
const vanSchema = new mongoose.Schema({
    van_name: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    email_address: { type: String, required: true },
    mobile_number: { type: String, required: true },
    location: String,
    open: Boolean
})


const Van = mongoose.model('Van', vanSchema)
module.exports = { Van }