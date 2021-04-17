const { Menu } = require('../model/menu')

// get menu
const getMenu = async(req, res) => {
    try{
        const snacks = await Menu.find({ type: 'snack' }, { food_name: true, price: true, photo: true }).lean()
        const drinks = await Menu.find({ type: 'drink' }, { food_name: true, price: true, photo: true }).lean()
        res.render('menu.hbs', {"snacks": snacks})
    } catch (err){
        console.log(err)
    }
}

const getMenuDetails = async(req, res) => {
    let result = await Menu.find({ food_name: req.params.food_name }, {})
    res.send(result)
}

module.exports = { getMenu, getMenuDetails }