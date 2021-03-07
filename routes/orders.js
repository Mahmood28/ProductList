const express = require("express");
const passport = require("passport");
const { checkout } = require("../controllers/orderControllers");
const router = express.Router();

module.exports = router;

router.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  checkout
);
