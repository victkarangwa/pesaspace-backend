"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          id:"862f912a-1f4a-4f8c-8dbb-9211552768a9",
          first_name: "John",
          last_name: "Doe",
          email: "admin@pesaspace.com",
          password:
            "$2a$10$FzD85UFC3I.9w/krmk0UJet3J2/WwtNjCPL5pw/ViZRSzyQF3eScu",
          role: "admin",
          isVerified: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
