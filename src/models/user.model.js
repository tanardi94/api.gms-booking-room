const Sequelize = require('sequelize')
const db = require('../../config/database')

const { DataTypes } = Sequelize

const User = db.define('users', {
    gmsUserID: {
        field: 'gms_user_id',
        type: Sequelize.UUID
    },
    name: {
        field: 'full_name',
        type: Sequelize.STRING
    },
    roleType: {
        field: 'role_type',
        type: Sequelize.INTEGER
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