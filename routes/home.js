const express = require("express");
const router = express.Router();
const homeController = require('../controllers/homeController')

router.get("/", homeController.homeView);

module.exports = router;

