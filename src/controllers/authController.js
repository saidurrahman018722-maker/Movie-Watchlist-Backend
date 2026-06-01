import {prisma} from "../lib/prisma.js";
import  bcrypt from "bcryptjs"
import {generateToken} from "../utils/genarationJWT.js"

const Register= async (req,res)=>{
    const {name,email,password}=req.body;
    const userExists= await prisma.user.findUnique({
        where : {email:email}
 });
 if(userExists){
    res.status(400).json({message:"the user already exists."});
 }

 //hasshed Password 

 const salt = await bcrypt.genSalt(10);
 const hassedPassword = await bcrypt.hash(password,salt);

 //creating user
  const user = await prisma.user.create({
    data:{
        name,
        email,
        password:hassedPassword
    },
  });
   const token = generateToken(user.id,res);

  res.status(201).json({
    status:"success",
    data:{
        user:{
            id:user.id,
            name:name,
            email:email
        },
        token

    }
  })
    
}

const login = async (req,res)=>{
    const {email,password}=req.body;

    const user = await prisma.user.findUnique({
        where:{email:email},
    });
    if(!user){
        res.status(400).json({
            error: " Invalid Email or Password."
        })
    }
    const isValidPassword = await bcrypt.compare(password,user.password);
    if(!isValidPassword){
        res.status(400).json({
            error: " Invalid Email or Password."
        });
    }
    const token = generateToken(user.id,res);
    res.status(201).json({
        status:"success",
        data:{
            user:user.id,
            email:email
        },
        token
    })
}

const logout = async (req,res)=>{

    res.cookie("jwt","",{
        httpOnly:true,
        expires: new Date(0),
    })
    res.status(201).json({
        satutes:"successe",
        message:"successfully log out"
    })
}


export {Register,login,logout};