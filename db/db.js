const config = require("../config/config");
const mysql = require("mysql2/promise");
const {Sequelize} = require("sequelize");

module.exports = db ={};

async function initilize() {
    const {host,port,user,password,database} = config.db
    const connection = await mysql.createConnection({
        host,
        port,
        user,
        password
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    //connect to db
    const sequelize = new Sequelize(database,user,password,{
        dialect:"mysql",
        host
    });
    // init module and add them to the exported db object 
    db.User = require("../models/user.modle")(sequelize);
    db.Product = require("../models/product.model")(sequelize);
    

    await sequelize.sync({alter:true});
}

initilize();