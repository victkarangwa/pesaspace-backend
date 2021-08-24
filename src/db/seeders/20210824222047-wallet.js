"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "wallets",
      [
        {
          id: "d94a4e42-af1c-4413-a82e-2e989ef93d4b",
          user_id: "862f912a-1f4a-4f8c-8dbb-9211552768a9",
          balance: 0,
          currency: "RWF",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("wallets", null, {});
  },
};
