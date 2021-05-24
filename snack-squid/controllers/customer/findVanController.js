const Van = require('../../model/van')

const renderMap = async(req, res) => {
    // const fiveVans = await (receiveLocation(req, res))
    // for (let i = 0; i < openVans.length; i++) {
    //     fiveVans[i]['location'] = JSON.stringify(fiveVans[i]['location'])
    // }
    const openVans = await Van.find({ open: true }, { vanName: true, location: true, textLocation: true }).lean()
    for (let i = 0; i < openVans.length; i++) {
        openVans[i]['location'] = JSON.stringify(openVans[i]['location'])
    }
    console.log(openVans)
    res.render('customer/map', { 'Vans': openVans });
}

const chooseVan = (req, res) => {
    let vanName = req.body.vanName
    console.log('choosing van:', vanName)
    return res.redirect('/customer/menu/van=' + vanName)
}


module.exports = { renderMap, chooseVan }