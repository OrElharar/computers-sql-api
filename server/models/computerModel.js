const { DataTypes } = require("sequelize");
const sequelize = require('../db/sequelize');

const Computer = sequelize.define("computer", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    manufacturer: {
        type: DataTypes.STRING
    },
    model: {
        type: DataTypes.STRING
    },
    cpu: {
        type: DataTypes.STRING
    },
    ram: {
        type: DataTypes.STRING
    },
    disc: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    }
})

module.exports = Computer;

