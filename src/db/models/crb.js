'use strict';
module.exports = (sequelize, DataTypes) => {
  const crb = sequelize.define('crb', {
    nid: DataTypes.STRING,
    credit: DataTypes.DOUBLE,
    isCleared: DataTypes.BOOLEAN
  }, {});
  crb.associate = function(models) {
    // associations can be defined here
  };
  return crb;
};