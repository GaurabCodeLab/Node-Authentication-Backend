const express = require("express");
const jwt = require("jsonwebtoken");
const userController = require("../controller/user");

const router = express.Router();
const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Authorization token is missing" });
  }
  try {
    const isValidUser = jwt.verify(token, secretKey);
    req.user = isValidUser;
  } catch (error) {
    res.status(401).json({ error: "Token is invalid or expired" });
  }
  next();
};

exports.router = router
  .get("/", userController.getAllUsers)
  .post("/registration", userController.registerUser)
  .post("/login", userController.loginUser)
  .get("/protected", authMiddleware, userController.protected);
