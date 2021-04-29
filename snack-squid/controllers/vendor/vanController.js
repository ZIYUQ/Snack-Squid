const { Van } = require('../../model/van')
const bcrypt = require('bcrypt')
const saltRounds = 10
    // find the van by vanName

// return all teh van
const getAllVan = async(req, res) => {
    try {
        const vans = await Van.find({})
        return res.send(vans)
    } catch (err) {

        return res.status(400).send("Database query failed")
    }
}


const hashPassword = async(plainPassword) => {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds).then(function(err, hash) {
        if (err) return err
        return hash
    })
    return hashedPassword
}



// add new Van
const addVan = async(req, res) => {
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
    const hashedPassword = await hashPassword(req.body.password)
    console.log(hashedPassword)
    const newVan = new Van({
        vanName: req.body.vanName,
        password: hashedPassword,
        emailAddress: req.body.emailAddress,
        mobileNumber: req.body.mobileNumber,
        location: "",
        open: false
    })
    newVan.save((err, result) => {
        if (err) console.log(err)
        res.send(result)
    })
}

// find van by id
const getVanById = async(req, res) => {
    try {
        const oneVan = await Van.findOne({
            _id: req.params.id
        })
        if (oneVan === null) {
            res.status(404)
            return res.send("Van not found")
        }
        return res.send(oneVan)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

// find van by its name 
const getVanByName = async(req, res) => {
    try {
        const oneVan = await Van.findOne({
            vanName: req.params.vanName
        })
        if (oneVan === null) {
            res.status(404)
            return res.send("Van not found")
        }
        return res.send(oneVan)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

// Check vanName and password when login
// If van is valid, allow the van to set up location and open
const login = async(req, res) => {
    result = await Van.findOne({
        vanName: req.body.vanName,
        password: req.body.password
    }, { vanName: true })
    if (result) {
        res.redirect('/open-for-business/:' + result['vanName'])
    } else {
        res.send('<h1>no such van</h1>')
    }
}
module.exports = {
    getAllVan,
    addVan,
    getVanById,
    getVanByName,
    login
}