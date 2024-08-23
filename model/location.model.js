import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

const LocationModel = sequelize.define("Location", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true,
            min: -90,
            max: 90
        }
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true,
            min: -180,
            max: 180
        }
    }
}, {
    timestamps: false
});

export default LocationModel
