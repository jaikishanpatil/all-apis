const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const db = require("../db/db");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

module.exports = {
    getAllUsers,
    getUserById,
    create
}

//functions for api uses
async function getAllUsers() {
    return db.User.findAll();
}

async function getUserById(id) {
    const user = await getUser(id);
    return {
        ...omitPassword(user.dataValues)
    };
}

async function create(params) {
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw `Email '${params.email}' is alredy registered`;
    }
    if(params.password === params.confirmPassword){
        const user = new db.User(params);
        user.passwordHash = await bcrypt.hash(params.password, 10); //hash the password
    
        await user.save();
    }else{
        throw `Password dosen't match with confirm password`;
    }
}




// helper function

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user || !user?.isActive) throw "User Not Found";

    return user;
}

async function omitPassword(user) {
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

