import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {userModel} from "../models/users.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    const user = await userModel.findOne({username});
    
    if (user) {
        return res.json({message: "User already exists!"});
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({username, password: hashedPassword});
    
    await newUser.save();
    
    return res.json({message: "User registered successfully"});
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await userModel.findOne({username});
    
    if (!user) {
        return res.json({message: "User doesn't exist"});
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        return res.json({message: "Username or Password Incorrect"});
    }
    
    let environmentVariable = "secretNameInformation";
    
    const token = jwt.sign({id: user._id}, `${environmentVariable}`);
    return res.json({token, id: user._id});
});

router.post("/login");

export {router as userRouter};