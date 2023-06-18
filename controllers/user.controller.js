const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");
const userService = require("../services/user.service");

// routes

router.post("/create",crateSchema,create);

module.exports = router;

function create(req, res, next) {
    userService
      .create(req.body)
      .then(() => res.json({ message: "User created" ,response:res.req.body}))
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
    validateRequest(req,next,schema);
}