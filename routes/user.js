const express = require("express");
const jwt = require("jsonwebtoken");
const userController = require("../controller/user");

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers && req.headers.authorization;
    if(!authHeader){
        res.status(400).send("Token does not exist");
    };
    const token = authHeader.split(" ")[1];
    try {
        const isValidUser = jwt.verify(token, secretKey);
        req.user = isValidUser;
    } catch (error) {
        res.status(400).send("Token is invalid");
    }
   next();
}

exports.router = router.get("/", userController.getAllUsers)
                 .post("/registration", userController.registerUser)
                 .post("/login", userController.loginUser)
                 .get("/protected", authMiddleware, userController.protected)
