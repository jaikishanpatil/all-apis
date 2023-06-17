const config = {
    db: {
        host: process.env.DB_HOST,                  // database host name sql201.epizy.com
        port: process.env.DB_PORT,                  // databse post 
        user: process.env.DB_USERNSME,              // database username
        password: process.env.DB_PASSWORD,          // database password
        database: process.env.DB_NAME,              //databse name
        multipleStatements: true,
    },
    secret: process.env.SECRET
}

module.exports = config;

// Database config is from free hosting