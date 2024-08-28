import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { memoryStorage } from "multer";

// login user
const loginUser = async(req,res)=>{
    const {pnr,password}=req.body;
    try {
        const user =await userModel.findOne({pnr});
        if(!user){
            return res.json({success:false,message:"User Doesn't exist"})
        }
        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"})
        }
        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// Create a token for the user
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
const registerUser = async (req, res) => {
    const { name, pnr, password } = req.body; 

    const errors = []; 

    try {
        // Check if user already exists
        const exists = await userModel.findOne({ pnr });
        if (exists) {
            return res.json({ success: false, message: "PNR already exists" });
        }

        // Validate PNR format
        if (pnr.toString().length !== 10){ 
            errors.push("Please enter a valid PNR");
        }

        // Validate password strength
        if (!validator.isStrongPassword(password, { minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1 })) { 
            errors.push("Please enter a stronger password");
        }

        // If there are any validation errors, return them
        if (errors.length > 0) {
            return res.json({ success: false, messages: errors }); 
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 48);

        const newUser = new userModel({
            name: name,
            pnr: pnr,
            password: hashedPassword,
            expiresAt: expirationDate
        });

        const user = await newUser.save();

        // Create token for new user
        const token = createToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error during registration" });
    }
};

export { loginUser, registerUser };
