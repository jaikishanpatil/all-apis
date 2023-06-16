const config = {
    db: {
        host: process.env.DB_HOST,                  // database host name sql201.epizy.com
        port: process.env.DB_PORT,                  // databse post 
        user: process.env.DB_USERNSME,              // database username
        password: process.env.DB_PASSWORD,          // database password
        database: process.env.DB_NAME,              //databse name
        multipleStatements: true,
    },
    secret: "0ae316f776a491117d25362652421e090f42d8ba4b2f709fc049775887990db76824f2857eb6ba24a9c90784fd4564fdf00aed47b1d349a37aec4b1cf7659414"
}

module.exports = config;

// Database config is from free hosting