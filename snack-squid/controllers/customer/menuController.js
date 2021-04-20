const { Menu } = require('../../model/menu')

// get menu
const getMenu = async(req, res) => {
    try{
        const foods = await Menu.find({}, { foodName: true, price: true, photo: true , _id: false }).lean()
        //const snacks = await Menu.find({ type: 'snack' }, { food_name: true, price: true, photo: true }).lean()
        //const drinks = await Menu.find({ type: 'drink' }, { food_name: true, price: true, photo: true }).lean()
        //res.render('customer/menu', {"snacks": snacks, "drinks": drinks})
        res.send(foods)
    } catch (err){
        console.log("failed to get menu!")
    }
}



const getFoodDetails = async(req, res) => {
    try{
        const food = await Menu.find({ tag: req.params.tag }, { foodName: true, price: true, photo: true , description: true, _id: false}).lean()
        //res.render('customer/foodDetails', {"food": food})
        res.send(food)
    } catch (err){
        console.log("failed to get food details!")
    }
}

module.exports = { getMenu, getFoodDetails }