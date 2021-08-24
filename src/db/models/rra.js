'use strict';
module.exports = (sequelize, DataTypes) => {
  const rra = sequelize.define('rra', {
    nid: DataTypes.STRING,
    company_name: DataTypes.STRING,
    tin: DataTypes.STRING,
    address: DataTypes.STRING,
    isTaxCleared: DataTypes.BOOLEAN
  }, {});
  rra.associate = function(models) {
    // associations can be defined here
  };
  return rra;
};