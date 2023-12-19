const express = require("express");
const router = express.Router();
const authService = require("../services/admin.service");
const userService = require("../services/user.service");

router.post("/login", authenticate);     // login api ready to login anyone
router.get("/verify", verifyToken);
router.post("/create", adminCreate);

module.exports = router;

function adminCreate(req,res,next) {
    userService
        .create(req.body)
        .then(()=>res.json({ message: "User created", response: res.req.body }))
        .catch(next);
}

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