const config = require("../config/config");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

module.exports = {
    authenticate,
    verifyToken
}

async function authenticate({ email, password }) {
    const user = await userService.getUserByEmailOrPhoneNumberAndPassword(
        email,
        password
    );
    const token = jwt.sign({ sub: user.id }, config.secret, {
        expiresIn: '1800s' //it means 30 min
    });
    return {
        ...user,
        token
    }
}

async function verifyToken(request) {
    if (request.headers.authorization) {
        const tokenArray = request.headers.authorization.split(" ");
        jwt.verify(tokenArray[1], config.secret, (err, decoded) => {
            if (err) {
                throw "Failed to authenticate token";
            } else {
                request.user = decoded;
                return {
                    request,
                }
            }
        });
    } else {
        throw "No token provided.";
    }
}
