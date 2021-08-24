"use strict";
module.exports = (sequelize, DataTypes) => {
  const loans = sequelize.define(
    "loans",
    {
      nid: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      org_type: DataTypes.STRING,
      status: DataTypes.STRING,
      product_id: DataTypes.STRING,
      total_amount_to_pay: DataTypes.DOUBLE,
      isPaid: DataTypes.BOOLEAN,
      amount_borrowed: DataTypes.DOUBLE,
      amount_paid: DataTypes.DOUBLE,
    },
    {}
  );
  loans.associate = function (models) {
    // associations can be defined here
    loans.belongsTo(models.products, {
      as: "product",
      foreignKey: "product_id",
    });
  };
  return loans;
};
