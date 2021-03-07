const express = require("express");
const passport = require("passport");
const {
  shopList,
  shopCreate,
  productCreate,
  shopDelete,
  shopUpdate,
  fetchShop,
} = require("../controllers/shopControllers");
const { Shop } = require("../db/models");
const upload = require("../middleware/multer");
const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    next({
      status: 404,
      message: "Shop Not Found",
    });
  }
});

router.get("/", shopList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopCreate
);

router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productCreate
);

module.exports = router;
