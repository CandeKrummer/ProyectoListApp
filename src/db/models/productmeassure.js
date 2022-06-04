'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductMeassure extends Model {

    static associate(models) {
      //ProductMeassure.hasOne(models.Product)

    }
  }
  ProductMeassure.init({
    maessure: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
  }, {
    sequelize,
    modelName: 'ProductMeassure',
  });
  return ProductMeassure;
};