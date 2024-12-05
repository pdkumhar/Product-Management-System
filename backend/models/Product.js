const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Ensure User is imported before defining associations

// Define the Product model
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'products',
});

// Define associations
Product.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Product, { foreignKey: 'userId' });

module.exports = Product;
