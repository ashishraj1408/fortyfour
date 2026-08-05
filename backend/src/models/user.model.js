const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.JSONB,
      allowNull: true,
      validate: {
        isValidAddress(value) {
          if (!value || typeof value !== 'object') {
            throw new Error('Address is required');
          }

          if (!value.street || !value.city || !value.zip || !value.geo || !value.geo.lat || !value.geo.lng) {
            throw new Error('Address details are required');
          }
        },
      },
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: false,
  }
);

module.exports = User;
