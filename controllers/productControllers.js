const { Product, Shop } = require("../db/models");

const saveImage = (req) => {
  if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
};

exports.fetchProduct = async (productId, next) => {
  try {
    const foundProduct = await Product.findByPk(productId);
    return foundProduct;
  } catch (error) {
    next(error);
  }
};

exports.productList = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    saveImage(req);
    const updatedProduct = await req.product.update(req.body);
    res.status(201).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
