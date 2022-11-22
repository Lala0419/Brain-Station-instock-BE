const e = require("express");
const express = require("express");
const router = express.Router();
const path = require("node:path");
const inventoryController = require("../controller/inventoryController");

router.route("/").get(inventoryController.index);

module.exports = router;
