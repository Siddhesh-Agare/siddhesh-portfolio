import UserModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const testingApi = async(req, res)=>{
    try{
        res.json({ message: "API is working fine" });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const registerUser = async(req, res)=>{
    try {
        const {name, email, password}= req.body;

        if(!name || !email || !password){
            return res.status(400),json({success:false, message:"Please fill all the fields"});
        }

        if(password.length < 6){
            return res.status(400).json({success: false, message: "Password must be at least 6 character"})
        }

        const existingUser = await UserModel.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
        token,
    });
        
    } catch (error) {
        console.log(error, "in register user");
        return res.status(500).json({
            success:false,
            message: "Internal Server Error !"
        })
    }
}

export const loginUser = async(req, res)=>{
    try {
        const {email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({success:false, message:"Please fill all the fields"});
        }

        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exist",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            token,
        });
        
    } catch (error) {
        console.log(error, "in login user");
        return res.status(500).json({
            success:false,
            message: "Internal Server Error !"
        })
    }
    };