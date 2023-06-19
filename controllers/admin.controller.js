const express = require("express");
const router = express.Router();
const authService = require("../services/admin.service");

router.post("/login", authenticate);     // login api ready to login anyone
router.get("/verify", verifyToken)

module.exports = router;

function authenticate(req, res, next) {
    authService
        .authenticate(req.body)
        .then((user) => res.json({message:"Login Successfull" , user}))
        .catch(next);
}

function verifyToken(req, res, next) {
    authService
        .verifyToken(req)
        .then((users) => res.json({message:"Verifyed User",users}))
        .catch(next)
}