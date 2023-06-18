const { DataTypes, Sequelize } = require("sequelize");


function model(sequelize) {
    const attributes = {
        userId: { type: DataTypes.UUID, defaultValue: Sequelize.UUIDV1 },
        name: { type: DataTypes.STRING, allowNull: true },
        gender: { type: DataTypes.STRING, allowNull: true },
        image: { type: DataTypes.BLOB, allowNull: true },
        dob: { type: DataTypes.DATEONLY, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: false },
        phoneNumber: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: false },
        isactive: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
        createdAt: { type: DataTypes.JSON, allowNull: true },
        updatedAt: { type: DataTypes.JSON, allowNull: true }
    };

    const options = {
        defaultScope: {
        },
        scope: {
            withHash: { attributes: {} },
        },
    };

    return sequelize.define("User", attributes, options);
}

module.exports = model;