const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("../db/db");
const config = require("../config/config");

module.exports = {
    getAllProducts,
    getProductById,
    crateProduct,
    updateProduct,
    deleteProduct
}


async function getAllProducts() {
    return db.Product.findAll();
}

async function getProductById(id) {
    const product = await getProduct(id);
    return product.dataValues;
}

async function crateProduct(params) {
    // if(await db.Product.findOne({where:{}})){

    // }
    const product = new db.Product(params);
    await product.save();
}

async function updateProduct(id,params) {
    const product = await getProduct(id);
    Object.assign(product,params);
    await product.save();
}

async function deleteProduct(id) {
    const product = await getProduct(id);
    await product.destroy();
}


//helper function
async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if(!product) throw "Product not found";

    return product;
}