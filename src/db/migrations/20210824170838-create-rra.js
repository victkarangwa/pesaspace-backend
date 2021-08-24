'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rras', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nid: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.STRING
      },
      tin: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      isTaxCleared: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('rras');
  }
};