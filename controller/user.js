const { dbConnection } = require("../lib/dbConnection");
const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

exports.getAllUsers = async (req, res)=>{
    await dbConnection();
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json({"Error in getting users": error});
    }
};

exports.registerUser = async (req, res)=>{
    await dbConnection();
    try {
        const { email, password } = req.body;
        const isExisting = await User.findOne({email});
        if(isExisting){
            res.status(400).send("User already exist");
        };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashedPassword});
    res.status(201).send("User Registered Successfully");
    } catch (error) {
        res.status(400).json({"Error in registering user": error});
    }
};

exports.loginUser = async (req, res)=>{
    await dbConnection();
    try {
        const { email, password } = req.body;
        const isAuthUser = await User.findOne({email});
        if(!isAuthUser){
            res.status(400).send("User does not exist");
        };
        const isMatch = await bcrypt.compare(password, isAuthUser.password);
        if(!isMatch){
            res.status(400).send("Password is incorrect");
        };
        const token = jwt.sign({id: isAuthUser._id, email: isAuthUser.email}, secretKey, {expiresIn: "1h"});
        res.status(200).json({token});
    } catch (error) {
        res.status(400).json({"Error in authenticating user": error});
    }
};

exports.protected = async (req, res)=>{
    res.status(200).send(`This is protected Route and I am ${req.user.email}`);
};
