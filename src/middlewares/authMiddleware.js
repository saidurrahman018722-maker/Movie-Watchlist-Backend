import {prisma} from "../lib/prisma.js";
import jwt from "jsonwebtoken"


export const authMiddleware = async (req,res,next)=>{
    let token;
    console.log("this is the authmiddleware");

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }   
    else if(req.cookies?.jwt){
        token=req.cookies.jwt;
    }

    if(!token){
        return res.status(400).json({
            status:"u fucked up",
            error:"Not authinticated."
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user= await prisma.user.findUnique({
            where:{
                id: decoded.id,
            },
        })

        if(!user){
            return res.status(400).json({
                status:"unsuccessfull",
                error:"the user no longer exits"
            })
        }
        req.user=user;
        next();
    } catch (error) {
        return res.status(400).json({
                status:"unsuccessfull",
                error:"the user does not exits"
            })
    }
}
