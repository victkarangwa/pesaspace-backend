'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    min_amount: DataTypes.DOUBLE,
    max_amount: DataTypes.DOUBLE,
    interest: DataTypes.FLOAT,
    period: DataTypes.STRING
  }, {});
  products.associate = function(models) {
    // associations can be defined here
  };
  return products;
};