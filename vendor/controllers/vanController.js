const { Van } = require('../models/van')

// find the van by van_name

// return all teh van
const getAllVan = async(req, res) => {
    try {
        const vans = await Van.find({})
        return res.send(vans)
    } catch (err) {
        return res.status(400).send("Database query failed")
    }
}


// add new Van
const addVan = (req, res) => {
    if (!req.body.vanName) {
        return res.status(404).send('you have to enter a valid vanName')
    }
    if (!req.body.password) {
        return res.status(404).send('you have to enter the password')
    }
    // if (req.body.comfirmPassword != req.body.password) {
    //     return res.status(404).send('you have to enter the same password')
    // }
    // Set name, password, email address and mobile number
    const newVan = new Van({
        vanName: req.body.vanName,
        password: req.body.password,
        emailAddress: req.body.emailAddress,
        mobileNumber: req.body.mobileNumber,
        location: "",
        open: false
    })
    newVan.save((err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}


const login = async(req, res) => {
    try {
        Van.findOne({
            van_name: req.body.van_name,
            password: req.body.password
        }).then((userInfo) => {
            if (!userInfo) {
                console.log('van is not exist')
                return
            }
            let data = {}
            data['username'] = userInfo.van_name
            data['password'] = userInfo.password
            req.session.userInfo = data
            res.redirect('/open-for-business')
        })
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    getAllVan,
    addVan,
    login
}