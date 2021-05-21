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
        if (thisVan['open'] === true) {
            await Van.updateOne({ _id: ID }, { $set: { textLocation: "", open: false } })
            req.logout()
            return res.redirect('/vendor/')
        } else {
            return res.redirect('/vendor/profile')
        }
    } catch (err) {
        res.send(err)
    }
}

const changeLocation = async(req, res) => {
    let ID = req.session.vanId;
    let newLocation = req.body.newLocation
    try {
        let thisVan = await Van.findOne({ _id: ID })
        if (thisVan['open'] === true) {
            await Van.updateOne({ _id: ID }, { $set: { location: newLocation } })
        }
        res.redirect('/vendor/order')
    } catch (err) {
        res.status(400).send('Database query failed')
    }
}

const renderProfile = (req, res) => {
    let ID = req.session.vanId;
    let thisVan = Van.findOne({ _Id: ID });
    res.render('vendor/profile', { 'Van': thisVan })
}
module.exports = { logout, close, changeLocation, renderProfile }