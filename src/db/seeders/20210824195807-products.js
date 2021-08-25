"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "products",
      [
        {
          id: "c8f342f1-59a6-4855-a8f1-2c6a1c5e08f8",
          min_amount: 10000,
          max_amount: 50000,
          interest: 1.4,
          period: "1m",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a5342357-693c-44ad-8231-53fb44b17dd4",
          min_amount: 50000,
          max_amount: 200000,
          interest: 1.8,
          period: "3m",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "beab6ce7-ad11-4425-b2dd-e7524737baa4",
          min_amount: 200000,
          max_amount: 1000000,
          interest: 2.2,
          period: "4m",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f5dc4385-940c-433d-abb2-212fbc972003",
          min_amount: 1000000,
          max_amount: 10000000,
          interest: 2.2,
          period: "5m",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("products", null, {});
  },
};
