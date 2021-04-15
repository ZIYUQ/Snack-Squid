const mongoose = require('mongoose')
const db = require('../db')

// menu model
const menuSchema = new mongoose.Schema({
    foodId: { type: String },
    name: { type: String, require: true },
    description: String,
    photo: String,
    price: { type: Number, require: true },
    type: String,
})

const Menu = mongoose.model("menu", menuSchema)

module.exports = { Menu }