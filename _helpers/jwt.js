const { expressjwt } = require("express-jwt");
const config = require("../config/config");

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressjwt({ secret, algorithms: ["HS256"] }).unless({
        path: [
            // path to ignor from authenticate from jwt token
            // "/api/user/create",
            "/login",
            "/verify",
            "/create"
        ]
    })
}