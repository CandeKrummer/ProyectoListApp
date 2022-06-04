'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductCategory.hasOne(models.Product)
    }
  }
  ProductCategory.init({
    category: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
  }, {
    sequelize,
    modelName: 'ProductCategory',
  });
  return ProductCategory;
};