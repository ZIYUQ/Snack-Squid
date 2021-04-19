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
        return res.status(404).send('you have to enter a valid van_name')
    }
    if (!req.body.password) {
        return res.status(404).send('you have to enter the password')
    }
    // if (req.body.comfirmPassword != req.body.password) {
    //     return res.status(404).send('you have to enter the same password')
    // }
    const newVan = new Van({
        van_name: req.body.vanName,
        password: req.body.password,
        email_address: req.body.emailAddress,
        mobile_number: req.body.mobileNumber,
        location: "",
        open: false
    })
    newVan.save((err, result) => {
        if (err) res.send(err)
        return res.send(result)
    })
<<<<<<< Updated upstream
    newVan.save((err, result) => {
        if (err) return err
        res.send(result)
        return res.redirect('/')
    })

=======
>>>>>>> Stashed changes
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

const getVanByNameAndPassword = async(req, res) => {
    try {
        const oneVan = await Van.findOne({
            van_van_name: req.params.van_van_name,
            password: req.params.password
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

const getVanByName = async(req, res) => {
    try {
        const oneVan = await Van.findOne({
            van_name: req.params.van_name
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

const login = async(req, res) => {
    result = await Van.findOne({
        van_name: req.body.van_name,
        password: req.body.password
    }, { van_name: true })
    if (result) {
        res.send(result)
    } else {
        res.send('<h1>no such van</h1>')
    }
}

module.exports = {
    getAllVan,
    addVan,
    getVanById,
    getVanByName,
    getVanByNameAndPassword,
    login
}