// import pkg from '@prisma/client';
// const { PrismaClient } = pkg;

// const prisma =new PrismaClient({
//     log : process.env.NODE_ENV==='development' ? ['query','error','warn'] : ['error'],
// });

import {prisma} from "../lib/prisma.js";

const connectDB =async()=>{
    try{
    await prisma.$connect();
    console.log("database conected.")
    }
    catch(error){
        console.log("database connection failed because of ",error);
        process.exit(1);
    }
}


const disconnectDB =async()=>{
    await prisma.$disconnect();
};

export {connectDB,disconnectDB};