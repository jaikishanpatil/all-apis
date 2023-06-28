const { DataTypes, Sequelize } = require("sequelize");

module.exports = productModel
function productModel(sequelize) {
    const attributes = {
        productId: { type: DataTypes.UUID, defaultValue: Sequelize.UUIDV1 },
        productName: { type: DataTypes.STRING, allowNull: false },
        productDescription: { type: DataTypes.STRING, allowNull: true },
        productPrice: { type: DataTypes.DECIMAL(10,2), allowNull: false },
        productImage: { type: DataTypes.BLOB, allowNull: true },
        productCategory: { type: DataTypes.STRING, allowNull: false },
        productQuantity: { type: DataTypes.INTEGER, allowNull: true }
    };
    const options = {
        defaultScope: {

        },
        scopes: {
            whithHash: { attributes: {} }
        }
    };

    return sequelize.define("Product", attributes, options);
}