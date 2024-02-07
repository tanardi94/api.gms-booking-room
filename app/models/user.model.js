const Sequelize = require('sequelize')
const db = require('../../config/database')

const { DataTypes } = Sequelize

const Users = db.define('users', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    emailVerified: {
        type: DataTypes.TIME,
        field: 'email_verified_at'
    },
    refreshToken: {
        type: DataTypes.STRING,
        field: 'refresh_token'
    },
    createdAt: {
        type: DataTypes.TIME,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.TIME,
        field: 'updated_at'
    },

}, {
    schema: 'internals'
});

module.exports = Users