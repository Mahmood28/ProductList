const express = require("express");
const db = require("./db/models/");
const productRoutes = require("./routes/products");
const cors = require("cors");
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use("/products", productRoutes);

app.use((req, res, next) => {
  const error = {
    status: 404,
    message: "Path Not Found!",
  };
  next(error);
});

app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error" });
});

db.sequelize.sync();

// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });
app.listen(8000);
