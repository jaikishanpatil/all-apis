const { DataTypes, Sequelize } = require("sequelize");

module.exports = Bank_System;
function Bank_System(sequelize) {
    const attributes = {
        accountOwnerName: { type: DataTypes.STRING, allowNull: false },
        contactNumber: { type: DataTypes.STRING, allowNull: false },
        accountEmail: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        accountAdhar: { type: DataTypes.STRING, allowNull: false },
        accountPanCard: { type: DataTypes.STRING, allowNull: true },
        accountProfileImage: { type: DataTypes.BLOB, allowNull: true },
        accountSignature: { type: DataTypes.BLOB, allowNull: true },
        accountNumber: { type: DataTypes.STRING, allowNull: false, unique:'accountNumber' },
        balance: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
        accountType: { type: DataTypes.ENUM('saving', 'current', 'credit'), allowNull: false },
        isVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        isClosed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        lastTransactionDate: { type: DataTypes.DATE, allowNull: true },
        accountOpenDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        accountCloseDate: { type: DataTypes.DATE, allowNull: true },
        branchCode: { type: DataTypes.STRING, allowNull: false },
        branchName: { type: DataTypes.STRING, allowNull: false },
    }
    const options = {
        defaultScope: {

        },
        scopes: {
            withHash: { attributes: {} }
        }
    }
    return sequelize.define("bank_system", attributes, options);
}