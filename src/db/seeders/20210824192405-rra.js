"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "rras",
      [
        {
          id: "41e032f8-47f5-4d46-86c9-87ae78c9bd22",
          nid: "199781185285026",
          company_name: "The Space Businesses Ltd.",
          tin: "082391693",
          address: "Kigali",
          isTaxCleared: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "26c9946d-4998-455c-b3a2-18f51c00432d",
          nid: "198281111185176",
          company_name: "Vruum Ltd.",
          tin: "130841892",
          address: "Nyamagabe",
          isTaxCleared: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("rras", null, {});
  },
};
