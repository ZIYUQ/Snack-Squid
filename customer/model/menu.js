const mongoose = require("mongoose")

// Menu model
const menuSchema = new mongoose.Schema({
    food_id: { type: Number, unique: true},
    food_name: { type: String, require: true },
    price: { type: Number, require: true },
    photo: String,
    type: String,
    description: String
})

const Menu = mongoose.model('menu', menuSchema)
module.exports = { Menu }