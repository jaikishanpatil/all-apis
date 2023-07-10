require("dotenv").config();
const express = require("express");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors"); // package use for allowing only authorized domain or urls 
const jwtToken = require("jsonwebtoken");
const bodyParser = require("body-parser");
const compression = require("compression");

// custome packages imports
const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");
const config = require("./config/config");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '40mb' })); // controls the maximum or body size

// security packages 
app.use(xss());  //prevent any malicious JavaScript code or any other code that attempts to hijack cookie and do malicious activities
app.use(hpp()); //Express middleware to protect against HTTP Parameter Pollution attacks.

// compression
app.use(compression()) //The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options

const whiteList = [""];
const corsOption = {
    origin: function (origin, callback) {
        if (true || whiteList.indexOf(origin) !== 1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};
app.use(cors(corsOption));

// using jwt auth to secure APIS 
app.use(jwt());

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwtToken.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = decoded.userId;
        next();
    });
}

app.use("/", require("./controllers/admin.controller"));
app.use("/api/user", verifyToken, require("./controllers/user.controller"));
app.use("/api/product", verifyToken, require("./controllers/product.controller"));
app.use("/api/cart", verifyToken, require("./controllers/cart.controller"));
app.use("/api/bank", verifyToken, require("./controllers/bank_system.controller"))
app.use("/api/student", verifyToken, require("./controllers/student_management_system.controller"));
// globle error handler 
app.use(errorHandler);

// app starts from here 
const port = process.env.APP_PORT || 8080;
app.listen(port, () => {
    console.log("started on port", port);
})

