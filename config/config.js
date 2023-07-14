const config = {
    db: {
        host: process.env.DB_HOST,                  // database host name sql201.epizy.com
        port: process.env.DB_PORT,                  // databse post 
        user: process.env.DB_USERNSME,              // database username
        password: process.env.DB_PASSWORD,          // database password
        database: process.env.DB_NAME,              //databse name
        multipleStatements: true,
    },
    secret: process.env.SECRET,
    emailConfig:{
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        url:"http://127.0.0.1:8000/reset-password"  // we can give our frontend url to redirect the reset password
    }
}

module.exports = config;

// Database config is from free hosting