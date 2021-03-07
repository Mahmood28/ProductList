const { Shop, Product } = require("../db/models");

const saveImage = (req) => {
  if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
};

exports.fetchShop = async (shopId, next) => {
  try {
    const foundShop = await Shop.findByPk(shopId);
    return foundShop;
  } catch (error) {
    next(error);
  }
};

exports.shopList = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      include: {
        model: Product,
        as: "products",
        attributes: ["id"],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    const foundShop = await Shop.findOne({
      where: { userId: req.user.id },
    });
    if (foundShop) {
      const err = new Error("You already have a shop");
      err.status = 400;
      next(err);
    } else {
      saveImage(req);
      req.body.userId = req.user.id;
      const newShop = await Shop.create(req.body);
      res.status(201).json(newShop);
    }
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    if (req.user.id === req.shop.userId) {
      saveImage(req);
      req.body.shopId = req.shop.id;
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } else {
      next({
        status: 401,
        message: "not your property maam",
      });
    }
  } catch (error) {
    next(error);
  }
};
