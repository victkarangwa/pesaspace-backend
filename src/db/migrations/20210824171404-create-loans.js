'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('loans', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nid: {
        type: Sequelize.STRING,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      tin: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      org_type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      product_id: {
        type: Sequelize.STRING,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      total_amount_to_pay: {
        type: Sequelize.DOUBLE
      },
      isPaid: {
        type: Sequelize.BOOLEAN
      },
      amount_borrowed: {
        type: Sequelize.DOUBLE
      },
      amount_paid: {
        type: Sequelize.DOUBLE
      },
      reason: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('loans');
  }
};