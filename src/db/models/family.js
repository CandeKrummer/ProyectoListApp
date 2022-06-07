'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Family extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Family.init({
    name: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    number: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Family',
  });
  return Family;
};