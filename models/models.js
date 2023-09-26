const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true, allowNull: false},
    firstName: {type: DataTypes.STRING, unique: true},
    lastName: {type: DataTypes.STRING, unique: true},
    moddleName: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: 'DEPARTMENT'},
})

module.exports = {
    User
}