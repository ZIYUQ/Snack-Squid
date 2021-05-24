const express = require("express")

const findVanRouter = express.Router();
const findVanController = require('../../controllers/customer/findVanController')

findVanRouter.get('/', findVanController.renderMap);

findVanRouter.post('/:vanName', findVanController.chooseVan)
    //findVanRouter.get('/', findVanController.renderFiveVan)

//findVanRouter.post('/', findVanController.receiveLocation)

module.exports = findVanRouter