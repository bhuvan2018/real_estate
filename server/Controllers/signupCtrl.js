const user=require('../Model/signup')
const bcrypt=require('bcryptjs')


const registerUser=async(req,res)=>{
    const {firstName,lastName,email,password,confirmPassword}=req.body;
    if(password!==confirmPassword){
        return res.status(400).json({message:"Passwords do not match"})
    }
    try{
        const emailExists=await user.findOne({email});
        if(emailExists){
            return res.status(400).json({message:"Email already exists"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=await user.create({
            firstName,
            lastName,
            email,
            password:hashedPassword
        });
        res.status(201).json({
            message:'User created successfully',
            data:newUser
        });
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
};

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const userExists=await user.findOne({email});
        if(!userExists){
            return res.status(400).json({message:"invalid email"})
        }
        const isMatch=await bcrypt.compare(password,userExists.password);
        if(!isMatch){
            return res.status(400).json({message:"invalid password"})
        }
        res.json({message:"User logged in successfully",data:userExists});
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}
module.exports={registerUser,loginUser};