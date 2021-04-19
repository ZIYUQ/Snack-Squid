const { Van } = require("../model/van")

const findVan = async(req, res) =>{
    try{
        const openVan = await Van.find({open: {$ne: false}}, {van_name: true, _id: false})
        res.send(openVan)

    }catch(err){
        res.status(400).send("error")

    }

}

module.exports = { findVan }
