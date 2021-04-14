const mongoose = require('mongoose')
const db = require('../db')

// menu model
const menuSchema = new mongoose.Schema({
    name: {type:String, require:true},
    description: String,
    price:{type: Number, require:true},
    photo:String,
})
const menu = mongoose.model("menu", menuSchema)

module.exports = {menu}