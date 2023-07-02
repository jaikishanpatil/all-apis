const express = require("express");
const router = express.Router();
const joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const bankService = require("../services/bank_system.service");

module.exports = router

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/create", crateSchema, createUser);
router.put("/update", updateSchema, updateUser);
router.delete("/delete", deleteUser);
router.post("/filters",filters)


function getAllUsers(req, res, next) {
    bankService
        .getAllUsers()
        .then((users) => res.json(users))
        .catch(next)
}

function getUserById(req, res, next) {
    bankService
        .getUserById(req.params.id)
        .then((user) => res.json(user))
        .catch(next)
}

function createUser(req, res, next) {
    bankService
        .crateUser(req.body)
        .then(() => res.json({ message: "User crated successfully" }))
        .catch(next)
}
function updateUser(req, res, next) {
    bankService
        .updateUser(req.body)
        .then(() => res.json({ message: "User Updated successfully...!" }))
        .catch(next)
}
function deleteUser(req, res, next) {
    bankService
        .deleteUser(req.query)
        .then(() => res.json({ message: "User deleted successfully" }))
        .catch(next)
}

function filters(req, res, next) {
    bankService
        .filters(req.body)
        .then((data) => res.json(data))
        .catch(next)
}



function crateSchema(req, res, next) {
    const schema = joi.object({
        accountOwnerName: joi.string().required(),
        contactNumber: joi.string().min(10).max(10).empty("").required(),
        accountEmail: joi.string().required(),
        address: joi.string().required(),
        accountAdhar: joi.string().min(12).max(12).required(),
        accountPanCard: joi.string().required(),
        accountNumber: joi.string().required(),
        balance: joi.number(),
        accountType: joi.string().required(),
        isVerified: joi.boolean(),
        isClosed: joi.boolean().required(),
        accountCloseDate: joi.date(),
        branchCode: joi.string().required(),
        branchName: joi.string().required()
    })
    validateRequest(req, next, schema)
}
function updateSchema(req, res, next) {
    const schema = joi.object({
        accountOwnerName: joi.string(),
        contactNumber: joi.string().min(10).max(10).empty(""),
        accountEmail: joi.string().required(),
        address: joi.string(),
        accountAdhar: joi.string().min(12).max(12).required(),
        accountPanCard: joi.string().required(),
        accountNumber: joi.string().required(),
        balance: joi.number(),
        accountType: joi.string(),
        isVerified: joi.boolean(),
        isClosed: joi.boolean(),
        accountCloseDate: joi.date(),
        branchCode: joi.string(),
        branchName: joi.string()
    })
    validateRequest(req, next, schema)
}
