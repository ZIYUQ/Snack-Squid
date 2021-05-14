const express = require("express")

const mapRouter = express.Router();
const findVanController = require('../../controllers/customer/findVanController')

mapRouter.get('/', findVanController.getLocation);

module.exports = mapRouter;