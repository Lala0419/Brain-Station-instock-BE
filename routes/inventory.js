const e = require("express");
const express = require("express");
const router = express.Router();
const path = require("node:path");
const inventoryController = require("../controller/inventoryController");

router
  .route("/")
  .get(inventoryController.index)
  .post(inventoryController.addItem);

router
  .route("/:id")
  .get(inventoryController.singleItem)
  .put(inventoryController.editItem)
  .delete(inventoryController.deleteItem);

module.exports = router;
