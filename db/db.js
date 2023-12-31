const config = require("../config/config");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

async function initilize() {
    const { host, port, user, password, database } = config.db
    const connection = await mysql.createConnection({
        host,
        port,
        user,
        password
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    //connect to db
    const sequelize = new Sequelize(database, user, password, {
        dialect: "mysql",
        host
    });
    // init module and add them to the exported db object 
    db.User = require("../models/user.modle")(sequelize);
    db.Product = require("../models/product.model")(sequelize);
    db.cart = require("../models/cart.model")(sequelize);
    db.bank_system = require("../models/bank_system.model")(sequelize);
    db.student_system = require("../models/student_management_system.model")(sequelize);
    // db.cart.belongsTo(db.User);
    // db.cart.belongsTo(db.Product);

    await sequelize.sync({ alter: true });
}

initilize();