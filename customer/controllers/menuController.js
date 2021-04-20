const { Menu } = require('../model/menu')

// get menu
const getMenu = async(req, res) => {
    try{
        const snacks = await Menu.find({ type: 'snack' }, { foodName: true, price: true, photo: true }).lean()
        const drinks = await Menu.find({ type: 'drink' }, { foodName: true, price: true, photo: true }).lean()
        res.render('menu', {"snacks": snacks, "drinks": drinks})
    } catch (err){
        console.log(err)
    }
}

const getFoodDetails = async(req, res) => {
    try{
        const food = await Menu.find({ _id: req.params._id }, { food_name: true, price: true, photo: true , description: true}).lean()
        res.render('foodDetails', {"food": food})
    } catch (err){
        console.log(err)
    }
}

module.exports = { getMenu, getFoodDetails }