'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContentMeassure extends Model {

    static associate(models) {
      ContentMeassure.hasOne(models.Product)
    }
  }
  ContentMeassure.init({
    maessure: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
  }, {
    sequelize,
    modelName: 'ContentMeassure',
  });
  return ContentMeassure;
};