const mongoose = require("mongoose")

// Menu model
const menuSchema = new mongoose.Schema({
    foodName: { type: String, require: true },
    tag: { type: String },
    price: { type: Number, require: true },
    photo: String,
    type: String,
    description: String
})

const Menu = mongoose.model('menu', menuSchema)
module.exports = { Menu }