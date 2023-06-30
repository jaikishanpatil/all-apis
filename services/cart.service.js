const { Op } = require("sequelize");
const de = require("../db/db");

module.exports = {
    getAllCart,
    getCartByUserId,
    addToCart,
    deleteCartItem
}

async function getAllCart() {
    return await db.cart.findAll();
}

async function getCartByUserId(id) {
    const cart = await getById(id);
    return cart.dataValues;
}

async function addToCart(params) {
    const { userId, productId, quantity } = params;
    const cartItem = await db.cart.findOne({ where: { userId: userId, productId: productId } });
    if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
    } else {
        const cart = new db.cart(params);
        await cart.save();
    }
}

async function deleteCartItem(params) {
    const cart = await getCartByCartIdAndUserId(params);
    await cart.destroy();
}







//helper function
async function getById(id) {
    const cart = await db.cart.findOne({where:{userId:id}});
    if (!cart) throw "Cart not found...!";

    return cart;
}

async function getCartByCartIdAndUserId(params) {
    const {userId , productId} = params
    const cart = await db.cart.findOne({ where: { userId: userId, productId: productId } })
    if (!cart) throw "Cart not found...!";

    return cart;
}