const e = require("express");
const express = require("express");
const router = express.Router();
const path = require("node:path");
const warehouseController = require("../controller/warehouseController");

router
  .route("/")
  .get(warehouseController.index)
  .post(warehouseController.addWarehouse);

router
  .route("/:id")
  .get(warehouseController.singleWarehouse)
  .put(warehouseController.updateWarehouse)
  .delete(warehouseController.deleteWarehouse);

router.route("/:id/inventories").get(warehouseController.warehouseInventories);

module.exports = router;
