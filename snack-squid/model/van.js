const mongoose = require('mongoose')

// Van model
const vanSchema = new mongoose.Schema({
    vanName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailAddress: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    location: String,
    open: Boolean
})


const Van = mongoose.model('Van', vanSchema)
module.exports = { Van }