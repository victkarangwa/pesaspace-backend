'use strict';
module.exports = (sequelize, DataTypes) => {
  const wallets = sequelize.define('wallets', {
    user_id: DataTypes.STRING,
    balance: DataTypes.DOUBLE,
    currency: DataTypes.STRING
  }, {});
  wallets.associate = function(models) {
    // associations can be defined here
    // wallets.belongsTo(models.menus, {
    //   as: "belongsTo",
    //   foreignKey: "user_id",
    // });
  };
  return wallets;
};