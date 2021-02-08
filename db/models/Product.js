module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      min: 2,
    },
    image: {
      type: DataTypes.STRING,
      isUrl: true,
    },
  });
};
