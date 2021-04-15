const { menu } = require('../model/order')

// get menu
const getMenu = async(req, res) => {
    let result = await menu.find({}, { food_name: true, price: true, photo: true, _id: false })
    res.send(result)
}

const getMenuDetails = async(req, res) => {
    let result = await menu.find({food_name: req.params.food_name}, {})
    res.send(result)
}

module.exports = { getMenu, getMenuDetails }