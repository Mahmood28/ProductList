const express = require("express");
const db = require("./db/models/");
const productRoutes = require("./routes/products");
const app = express();

app.use(express.json());
app.use("/products", productRoutes);

db.sequelize.sync();

// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });
app.listen(8000);
