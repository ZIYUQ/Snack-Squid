
const mongoose = require("mongoose")


<<<<<<< HEAD
// menu model
const menuSchema = new mongoose.Schema({
    name: {type:String, require:true},
    price:{type: Number, require:true},
    phote:String,
    type: String,
    description: String
})

const menu = mongoose.model("menu", menuSchema)
module.exports = {menu}
=======
// const menuSchema = new mongoose.Schema({
//     name: {type:String, require:true},
//     price:{type: Number, require:true},
//     phote:String,
//     type: String,
//     description: String
// })

// const snack = mongoose.model("snack", menuSchema)
// module.exports = {snack}
>>>>>>> parent of 5c10c9d (make it better)
