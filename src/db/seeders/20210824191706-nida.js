"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "nidas",
      [
        {
          id: "862f912a-1f4a-4f8c-8dbb-9211552768a9",
          first_name: "John",
          last_name: "Doe",
          nid: "199781185285026",
          pob: "Kigali",
          dob: "1991-01-01",
          sex: "Male",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "8ecc32ed-f9eb-4590-afc7-7b6a58330b28",
          first_name: "Peter",
          last_name: "Mahirwe",
          nid: "198281111185172",
          pob: "Nyamagabe",
          dob: "1982-01-01",
          sex: "Male",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("nidas", null, {});
  },
};
