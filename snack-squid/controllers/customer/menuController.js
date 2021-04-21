const { Menu } = require('../../model/menu')

// get menu
const getMenu = async(req, res) => {
    try {
        const foods = await Menu.find({}, {
            foodName: true,
            price: true,
            photo: true,
            _id: false
        }).lean()
        //const snacks = await Menu.find({ type: 'snack' }, { food_name: true, price: true, photo: true }).lean()
        //const drinks = await Menu.find({ type: 'drink' }, { food_name: true, price: true, photo: true }).lean()
        // empty menu
        if (foods.length == 0) {
            return res.send("no food to show in menu!")
        }
        return res.send(foods)
        //res.render('customer/menu', {"snacks": snacks, "drinks": drinks})
    } catch (err){
        return res.send("Database query failed!")
    }
}



const getFoodDetails = async(req, res) => {
    try {
        const food = await Menu.find({tag: req.params.tag}, {
            foodName: true,
            price: true,
            photo: true,
            description: true,
            _id: false
        }).lean()
        // if food does not exist
        if (food.length == 0) {
            return res.send("food does not exist!")
        }
        res.send(food)
        //res.render('customer/foodDetails', {"food": food})
    } catch (err){
        return res.send("Database query failed!")
    }
}

module.exports = { getMenu, getFoodDetails }