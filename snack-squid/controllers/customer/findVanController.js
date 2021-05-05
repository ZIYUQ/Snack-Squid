const { Van } = require("../model/van")

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

module.exports = { getAllVan, chooseVan }