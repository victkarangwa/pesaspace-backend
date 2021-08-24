'use strict';
module.exports = (sequelize, DataTypes) => {
  const nida = sequelize.define('nida', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    nid: DataTypes.STRING,
    pob: DataTypes.STRING,
    dob: DataTypes.DATE,
    sex: DataTypes.STRING
  }, {});
  nida.associate = function(models) {
    // associations can be defined here
  };
  return nida;
};