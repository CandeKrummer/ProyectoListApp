'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShoppingList.hasMany(models.ListedProduct)
      ShoppingList.belongsTo(models.ShoppingListCategory)
    }
  }
  ShoppingList.init({
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    listCategoryId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ShoppingList',
  });
  return ShoppingList;
};