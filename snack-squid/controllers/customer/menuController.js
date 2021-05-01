const { Menu } = require('../../model/menu')

// get menu
const getMenu = async(req, res) =>{
    try {
        const snacks = await Menu.find({ type: 'snack' }, {}).lean()
        const drinks = await Menu.find({ type: 'drink' }, {}).lean()
        // empty menu
        if (snacks.length == 0 || drinks.length ==0 ){
            console.log("no food to show in menu!")
            return res.send("no food to show in menu!")
        }
        res.render('customer/menu', {"snacks": snacks, "drinks": drinks})
    } catch (err) {
        console.log("Database query 'menu' failed!")
        return res.send("Database query 'menu' failed!")
    }
}



const getFoodDetails = async(req, res) => {
    try {
        const food = await Menu.find({ tag: req.params.tag }, { foodName: true, price: true, photo: true , description: true}).lean()
        // if food does not exist
        if (food.length == 0) {
            console.log("food does not exist!")
            return res.send("food does not exist!")
        }
        res.render('customer/foodDetails', {"food": food})
    } catch (err){
        console.log("Database query 'menu' failed!")
        return res.send("Database query 'menu' failed!")
    }
}

module.exports = { getMenu, getFoodDetails }