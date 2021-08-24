'use strict';
module.exports = (sequelize, DataTypes) => {
  const wallets = sequelize.define('wallets', {
    user_id: DataTypes.STRING,
    balance: DataTypes.DOUBLE,
    currency: DataTypes.STRING
  }, {});
  wallets.associate = function(models) {
    // associations can be defined here
  };
  return wallets;
};