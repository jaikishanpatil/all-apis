const express = require("express");
const router = express.Router();
const joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const productService = require("../services/product.service");
module.exports = router

router.get("/", getAll);
router.get("/:id", getProductById);
router.post("/create", crateSchema, crateProduct);
router.put("/update/:id", updateSchema, updateProduct);
router.delete("/delete/:id", _delete);

function getAll(req, res, next) {
    productService
        .getAllProducts()
        .then((products) => res.json(products))
        .catch(next);
}

function getProductById(req, res, next) {
    productService
        .getProductById(req.params.id)
        .then((product) => res.json(product))
        .catch(next);
}

function crateProduct(req, res, next) {
    productService
        .crateProduct(req.body)
        .then(() => res.json({ message: "Product added successfully...!" }))
        .catch(next)
}

function updateProduct(req, res, next) {
    productService
        .updateProduct(req.params.id, req.body)
        .then(() => res.json({ message: "Product updated successfully...!" }))
        .catch(next)
}

function _delete(req, res, next) {
    productService
        .deleteProduct(req.params.id)
        .then(() => res.json({ message: "Product deleted Successfully....!" }))
        .catch(next);
}

function crateSchema(res, req, next) {
    const schema = joi.object({
        productName: joi.string(),
        productDescription: joi.string(),
        productPrice: joi.string(),
        productCategory: joi.string(),
        productQuantity: joi.number()
    })
    validateRequest(req, next, schema);
}
function updateSchema(res, req, next) {
    const schema = joi.object({
        productName: joi.string(),
        productDescription: joi.string(),
        productPrice: joi.string(),
        productCategory: joi.string(),
        productQuantity: joi.number()
    })
    validateRequest(req, next, schema);
}