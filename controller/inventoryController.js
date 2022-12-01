const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

exports.index = (_req, res) => {
  knex("inventories")
    .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
    .select("inventories.*", "warehouses.warehouse_name")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Inventories: ${err}`)
    );
};

exports.singleItem = (req, res) => {
  knex("inventories")
    .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
    .select("inventories.*", "warehouses.warehouse_name")
    .where("inventories.id", req.params.id)
    .then((data) => {
      if (!data.length) {
        return res
          .status(404)
          .send(`Item with id: ${req.params.id} cannot be found`);
      }

      res.status(200).json(data[0]);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving item ${req.params.id} ${err}`);
    });
};

exports.addItem = (req, res) => {
  const { item_name, description, category, status, quantity, warehouse_id } =
    req.body;
  if (
    !item_name ||
    !description ||
    !category ||
    !status ||
    !quantity ||
    !warehouse_id
  ) {
    return res
      .status(400)
      .send("Please fill out all required fields before submitting request");
  }
  const newItemId = uuidv4();
  knex("inventories")
    .insert({ ...req.body, id: newItemId })
    .then((_data) => {
      knex("inventories")
        .where({ id: newItemId })
        .then((data) => {
          res.status(201).json(data[0]);
        });
    })
    .catch((err) => res.status(400).send(`Error creating item: ${err}`));
};

exports.editItem = (req, res) => {
  knex("inventories")
    .update(req.body)
    .where({ id: req.params.id })
    .then((_data) => {
      knex("inventories")
        .where({ id: req.params.id })
        .then((data) => {
          res.status(200).json(data[0]);
        });
    })
    .catch((err) => {
      res.status(400).send(`Error updating item ${req.params.id} ${err}`);
    });
};

exports.deleteItem = (req, res) => {
  knex("inventories")
    .delete()
    .where({ id: req.params.id })
    .then(() => {
      res.status(204).send(`Deleted`);
    })
    .catch((err) => {
      res.status(400).send(`Error deleting Item ${req.params.id} ${err}`);
    });
};
