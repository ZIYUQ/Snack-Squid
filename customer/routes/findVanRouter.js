const express = require("express")

const findVanRouter = express.Router();
const findVanController = require("../controllers/findVanController")

findVanRouter.get('/', findVanController.getAllVan)

findVanRouter.post('/', findVanController.chooseVan)

module.exports = findVanRouter