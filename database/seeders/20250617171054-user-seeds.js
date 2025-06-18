'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    *
    * Example:
    * await queryInterface.bulkInsert('People', [{
    *   name: 'John Doe',
    *   isBetaMember: false
    * }], {});
    */
   const { User } = require('../../app/models')
   await User.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'secret'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
