import Sequelize, { UUID, UUIDV4 } from 'sequelize';
import db from '../../config/database.js';

const User = db.define('User', {
    gmsUserID: {
        field: 'gms_user_id',
        type: Sequelize.UUID,
        allowNull: true,
        defaultValue: UUIDV4
    },
    name: {
        field: 'full_name',
        allowNull: false,
        type: Sequelize.STRING
    },
    nij: {
        field: 'NIJ',
        allowNull: true,
        type: Sequelize.STRING
    },
    roleType: {
        field: 'role_type',
        defaultValue: 1,
        type: Sequelize.INTEGER
    },
    createdAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at'
    },

}, {
    tableName: 'users',
});

db.sync()

export default User