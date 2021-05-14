const { Van } = require('../../model/van')
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDgiJFRfTbjVO1tmCspwRuo3k9kVMFeRRw'
});
const getAllVan = async(req, res) => {
    try {
        const openVan = await Van.find({ open: { $ne: false } }, { van_name: true, _id: false })
        res.send(openVan)

    } catch (err) {
        res.status(400).send("error")

    }
}

const chooseVan = async(req, res) => {

    res.redirect('/menu/van=' + req.body.van_name)
}

const getLocation = (req, res) => {
    googleMapsClient.geocode({
        address: '1600 Amphitheatre Parkway, Mountain View, CA'
    }, function(err, response) {
        if (!err) {
            console.log(response.json.results);
        }
    })
}

module.exports = { getAllVan, chooseVan, getLocation }