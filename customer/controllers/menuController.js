const { menu } = require('../model/order')

// get menu
const getMenu = async(req, res) => {
    try {
        result = await menu.find({}, { food_name: true, price: true, photo: true, _id: false })
        return res.send(result)
    } catch (err) {
        return res.status(400).send("error")
    }
}

const getMenuDetails = async(req, res) => {
    let result = await menu.find({food_name: req.params.food_name}, {})
    res.send(result)
}

module.exports = { getMenu, getMenuDetails }