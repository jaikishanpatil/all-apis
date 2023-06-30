const { DataTypes, Sequelize } = require("sequelize");

module.exports = cartModel
function cartModel(sequelize) {
    const attributes = {
        userId: { type: DataTypes.STRING, allowNull: false },
        productId: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false }
    };
    const optons = {
        defaultScope: {

        },
        scopes: {
            withHash: { attributes: {} }
        }
    };
    return sequelize.define("cart",attributes,optons);
}