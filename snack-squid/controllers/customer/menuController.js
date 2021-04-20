const { Menu } = require('../../model/menu')

// get menu
const getMenu = async(req, res) => {
    try{
        const foods = await Menu.find({ type: 'snack' }, { food_name: true, price: true, photo: true }).lean()
        const snacks = await Menu.find({ type: 'snack' }, { food_name: true, price: true, photo: true }).lean()
        const drinks = await Menu.find({ type: 'drink' }, { food_name: true, price: true, photo: true }).lean()
        //res.render('customer/menu', {"snacks": snacks, "drinks": drinks})
        res.send(foods)
    } catch (err){
        console.log(err)
    }
}

const getFoodDetails = async(req, res) => {
    try{
        const food = await Menu.find({ _id: req.params._id }, { food_name: true, price: true, photo: true , description: true}).lean()
        //res.render('customer/foodDetails', {"food": food})
        res.send(food)
    } catch (err){
        console.log(err)
    }
}

module.exports = { getMenu, getFoodDetails }