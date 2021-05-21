const { Van } = require('../../model/van')

const getAllVan = async(req, res) => {
    try {
        const openVans = await Van.find({ open: true }, { vanName: true, location: true }).lean()
        res.render('customer/map', { 'Vans': openVans });
    } catch (err) {
        res.status(400).send("error")

    }
}

const chooseVan = (req, res) => {
    let vanName = req.body.vanName
    console.log('choosing van:', vanName)
    return res.redirect('/customer/menu/van=' + vanName)
}

module.exports = { getAllVan, chooseVan }