const express = require("express")

const findVanRouter = express.Router();
const findVanController = require("../controllers/findVanController")

findVanRouter.get('/', findVanController.findVan)

module.exports = findVanRouter