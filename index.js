require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.port || 5050;

const warehouseRoutes = require("./routes/warehouse");
const inventoryRoutes = require("./routes/inventory");

app.use(express.json());

//basic home route
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/warehouse", warehouseRoutes);
app.use("/inventory", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
