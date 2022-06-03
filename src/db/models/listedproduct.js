'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListedProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ListedProduct.hasMany(models.Product)
      ListedProduct.hasMany(models.ShoppingList)
    }
  }
  ListedProduct.init({
    ShoppingListId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    ProductId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    cantidad: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'ListedProduct',
  });
  return ListedProduct;
};