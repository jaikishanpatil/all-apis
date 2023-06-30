const express = require("express");
const router = express.Router();
const joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const cartService = require("../services/cart.service");

module.exports = router;

router.get("/", getAllCart);
router.get("/:id", getCartByUserId);
router.post("/create", addSchema, addToCart);
router.delete("/", deleteCartItem);
function getAllCart(req, res, next) {
    cartService
        .getAllCart()
        .then((cart) => res.json(cart))
        .catch(next);
}

function getCartByUserId(req, res, next) {
    cartService
        .getCartByUserId(req.params.id)
        .then((cart) => res.json({ cart }))
        .catch(next)
}

function addToCart(req, res, next) {
    cartService
        .addToCart(req.body)
        .then(() => res.json({ message: "Cart add successfully...!" }))
        .catch(next);
}

function deleteCartItem(req, res, next) {
    cartService
        .deleteCartItem(req.query)
        .then(() => res.json({ message: "cart item delete successfully...!" }))
        .catch(next);
}



// schemas

function addSchema(req, res, next) {
    const schema = joi.object({
        userId: joi.string().required(),
        productId: joi.string().required(),
        quantity: joi.number().required()
    });
    validateRequest(req, next, schema);
}