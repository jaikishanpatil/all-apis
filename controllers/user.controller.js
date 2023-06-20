const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const userService = require("../services/user.service");

// routes
router.put("/update/:id", updateSchema, update);
router.post("/create", crateSchema, create);
router.get("/:id", getUserById)
router.get("/", getAll);
router.delete("/:id",_delete);

module.exports = router;

function getAll(req, res, next) {
    userService
        .getAllUsers()
        .then((users) => res.json(users))
        .catch(next);
}
function getUserById(req, res, next) {
    userService
        .getUserById(req.params.id)
        .then((users) => res.json(users))
        .catch(next)
}

function create(req, res, next) {
    userService
        .create(req.body)
        .then(() => res.json({ message: "User created", response: res.req.body }))
        .catch(next);
}
function update(req, res, next) {
    userService
        .update(req.params.id, req.body)
        .then(() => res.json({ message: "User Updated", response: res.req.body }))
        .catch(next);
}
function _delete(req,res,next) {
    userService
        .deleteUser(req.params.id)
        .then(()=>res.json({message:"User Deleted Successfully..!"}))
        .catch(next);
}
function crateSchema(res, req, next) {
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
        phoneNumber: Joi.string().min(10).max(10).required(),
        address: Joi.string(),
        gender: Joi.string()
    });
    validateRequest(req, next, schema);
}
function updateSchema(res, req, next) {
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phoneNumber: Joi.string().min(10).max(10).required(),
        address: Joi.string(),
        gender: Joi.string()
    });
    validateRequest(req, next, schema);
}