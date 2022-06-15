'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FamilyUser extends Model {

    static associate(models) {
    }
  }
  FamilyUser.init({

  }, {
    sequelize,
    modelName: 'FamilyUser',
  });
  return FamilyUser;
};