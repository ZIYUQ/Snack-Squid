const express = require("express")

const mapRouter = express.Router();
const findVanController = require('../../controllers/customer/findVanController')

mapRouter.get('/', findVanController.getAllVan);

module.exports = mapRouter;