const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const db = require("../db/db");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

module.exports = {
    getAllUsers,
    getUserById,
    create,
    loginUserByEmailOrPhoneNumberAndPassword,
    update,
    deleteUser
}

//functions for api uses
async function getAllUsers() {  //for admin level to get all users
    return db.User.findAll();
}

async function getUserById(id) {
    const user = await getUser(id);
    return {
        ...omitPassword(user.dataValues)
    };
}

async function create(params) {  //for admin and user level to add data into database
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw `Email '${params.email}' is alredy registered`;
    }
    if (params.password === params.confirmPassword) {
        const user = new db.User(params);
        user.password = await bcrypt.hash(params.password, 10); //hash the password

        await user.save();
    } else {
        throw `Password dosen't match with confirm password`;
    }
}
async function update(id,params) {  //for admin and user level to update data into database
    const user = await getUser(id);
    const emailChanged = params.email && params.email !== user.email;

    if(emailChanged && (await db.User.findOne({where:{email:email}}))){
        throw `Email '${params.email}' is alredy registered`;
    }
    if(params.password){
        params.password = await bcrypt.hash(params.password,10);
    }
    Object.assign(user,params);
    await user.save();
}

async function deleteUser(id) {
    const user =await getUser(id);
    await user.destroy();
}

async function loginUserByEmailOrPhoneNumberAndPassword(email, password) {   //function to login user
    const user = await db.User.findOne({
        where: {
            [Op.or]: [{ email: email || null }, { phoneNumber: email || null }],
            [Op.and]: [{ isactive: 1 }],
        }
    });

    if (!user) throw 'User does not exist';
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) throw "Username and Password dose not match";

    return {
        ...omitPassword(user.dataValues)
    }
}




// helper function

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw "User Not Found";

    return user;
}

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

