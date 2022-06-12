'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.ListedProduct)
      Product.belongsTo(models.ProductCategory)
      Product.belongsTo(models.ContentMeassure)
      //  Product.belongsTo(models.ProductMeassure, { foreignKey: "contentMeassureId" })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    brand: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    content: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    contentMeassureId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    productCategoryId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};