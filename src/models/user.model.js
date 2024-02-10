const Sequelize = require('sequelize')
const db = require('../../config/database')

const { DataTypes } = Sequelize

const User = db.define('users', {
    name: {
        type: DataTypes.STRING
    },
    uuid: {
        type: DataTypes.UUIDV4,
        defaultValue: Sequelize.UUIDV4
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
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

});

module.exports = User