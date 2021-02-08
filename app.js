const express = require("express");
const db = require("./db/models");
let products = require("./products");
const slugify = require("slugify");

const app = express();
app.use(express.json());

app.get("/products", (req, res) => {
  res.json(products);
});

app.delete("/products/:productId", (req, res) => {
  const foundProduct = products.find(
    (product) => product.id === +req.params.productId
  );
  if (foundProduct) {
    products = products.filter((product) => product !== foundProduct);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "The product requested does not exist." });
  }
});

app.post("/products", (req, res) => {
  newId = products[products.length - 1].id + 1;
  newSlug = slugify(req.body.name);
  newProduct = { id: newId, slug: newSlug, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

db.sequelize.authenticate();

app.listen(8000);

// const run = async () => {
//   try {
//     await db.sequelize.authenticate();
//     console.log("Connection to the database successful!");
//   } catch (error) {
//     console.error("Error connecting to the database: ", error);
//   }

//   await app.listen(8000, () => {
//     console.log("The application is running on localhost:8000");
//   });
// };

// run();
