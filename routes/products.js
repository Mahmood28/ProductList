const express = require("express");
const {
  productList,
  productDelete,
  productUpdate,
  fetchProduct,
} = require("../controllers/productControllers");
const { Product } = require("../db/models");
const upload = require("../middleware/multer");
const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    next({
      status: 404,
      message: "Porduct Not Found",
    });
  }
});

router.get("/", productList);

router.delete("/:productId", productDelete);

router.put("/:productId", upload.single("image"), productUpdate);

module.exports = router;
