import express from "express";
import MovieRoutes from "./routes/MovieRoutes.js";
import { config } from "dotenv";
import {connectDB,disconnectDB} from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";


config();
connectDB();
const app =express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use("/movies",MovieRoutes);
app.use("/auth",authRoutes);
app.use("/watchlist",watchlistRoutes);


const PORT=5001;
const server=app.listen(PORT,()=>{
    console.log(`server is running of port ${PORT}`)
});


process.on("unhandledRejection",(err)=>{
    console.error("unhandled rejection ",err);
    server.close(async ()=>{
        await disconnectDB();
        process.exit(1);
    });
});

process.on("uncaughtException", async (err)=>{
    console.error("uncaught exception ",err);
    await disconnectDB();
    process.exit(1);
});

process.on("SIGTERM", async ()=>{
    console.error(" SIGTERM received,shutting down greacfully");
    server.close(async()=>{
        await disconnectDB();
        process.exit(1);
    });

});

