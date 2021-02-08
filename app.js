const express = require("express");
const db = require("./db/models/");
const slugify = require("slugify");
const { Product } = require("./db/models");

const app = express();
app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      await foundProduct.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "This product does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      await foundProduct.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "This product does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

db.sequelize.sync();
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });
app.listen(8000);
