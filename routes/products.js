const express = require("express");
const {
  productList,
  productCreate,
  productDelete,
  productUpdate,
} = require("../controllers/productControllers");
const router = express.Router();

router.get("/", productList);

router.post("/", productCreate);

router.delete("/:productId", productDelete);

router.put("/:productId", productUpdate);

module.exports = router;
