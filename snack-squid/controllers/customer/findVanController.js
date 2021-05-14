const { Van } = require('../../model/van')

const getAllVan = async(req, res) => {
    try {
        const openVans = await Van.find({ open: true }, { vanName: true, location: true }).lean()
        res.render('customer/map', { 'Vans': openVans });
    } catch (err) {
        res.status(400).send("error")

    }
}

const chooseVan = async(req, res) => {

    res.redirect('/menu/van=' + req.body.van_name)
}

module.exports = { getAllVan, chooseVan }