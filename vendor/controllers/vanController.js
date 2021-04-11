const { Van } = require('../models/van')
const db = require('../db')


// add new Van
const addVan = (req, res) => {
    const newVan = new Van({
        van_name: req.body.vanName,
        password: req.body.password,
        email_address: req.body.emailAddress,
        mobile_number: req.body.mobileNumber,
        location: null
    })
    db.collection('vans').insertOne(newVan)
    res.send('Data received:\n' + JSON.stringify(newVan))
}

module.exports = {
    addVan
}