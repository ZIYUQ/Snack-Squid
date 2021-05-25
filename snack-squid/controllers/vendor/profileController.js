const Van = require('../../model/van')

const logout = async(req, res) => {
    req.logout()
    console.log('logout successfully')
    return res.redirect('/vendor/')
}

const close = async(req, res) => {
    let ID = req.session.vanId;
    try {
        let thisVan = await Van.findOne({ _id: ID })
        geolocation = {
            'latitude': 0.0,
            'longitude': 0.0
        }
        await Van.updateOne({ _id: ID }, { $set: { textLocation: "", open: false, location: geolocation } })
        console.log("van" + ID + "logout")
        req.logout()
        return res.redirect('/vendor/')
    } catch (err) {
        console.log("Database query collection 'menu' failed!")
        return res.redirect('/404-NOT-FOUND')
    }
}

const changetextLocation = async(req, res) => {
    let ID = req.session.vanId;
    let newLocation = req.body.newLocation
    console.log(newLocation)
    try {
        let thisVan = await Van.findOne({ _id: ID })
        await Van.updateOne({ _id: ID }, { $set: { textLocation: newLocation, open: true } })
        console.log('change to' + newLocation)
        res.redirect('/vendor/order')
    } catch (err) {
        console.log("Database query collection 'menu' failed!")
        return res.redirect('/404-NOT-FOUND')
    }
}

const renderProfile = async(req, res) => {
    try {
        let ID = req.session.vanId;
        let thisVan = await Van.findOne({ _id: ID }, { textLocation: true }).lean();
        res.render('vendor/profile', { 'Van': thisVan })
    } catch (err) {
        console.log("Database query collection 'menu' failed!")
        return res.redirect('/vendor/login')
    }
}

const changeLocation = async(req, res) => {
    ID = req.session.vanId
    try {
        let thisVan = await Van.findOne({ _id: ID }, { open: true })
        geoLocation = req.body;
        await Van.updateOne({ _id: ID }, { $set: { location: geoLocation } })
    } catch (err) {
        console.log("Database query collection 'menu' failed!")
        return res.redirect('/404-NOT-FOUND')
    }

}
module.exports = { logout, close, changetextLocation, renderProfile, changeLocation }