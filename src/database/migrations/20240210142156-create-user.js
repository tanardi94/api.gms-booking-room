'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gmsUserID: {
        allowNull: true,
        field: 'gms_user_id',
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        field: 'full_name',
        type: Sequelize.STRING
      },
      roleType: {
        allowNull: true,
        field: 'role_type',
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};