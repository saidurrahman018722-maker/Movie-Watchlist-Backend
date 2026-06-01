import {prisma} from "../lib/prisma.js";

export const addtoWatchlist = async (req,res)=>{
    const {movieId,notes,rating,status}=req.body;

    const movie= await prisma.movie.findUnique({
        where:{id:movieId},
    })
    if(!movie){
        res.status(404).json({
            error:"movie not found",
        })
    }
    const exitinginWatchlist = await prisma.watchlistItem.findUnique({
        where:{
            movieId_userId:{
            userId : req.user.id,
            movieId : movieId,
        }
    }})
    if(exitinginWatchlist){
        res.status(404).json({
            error:"movie not in the watchlist",
        })
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data:{
        movieId,
        userId : req.user.id,
        notes,
        rating,
        status:status|| "PLANNED",
        }
    })
    res.status(200).json({
        status:"suceess",
        message:"movie added",
        data:{
            watchlistItem,
        }
    })
}

export const removefromWatchlist = async (req,res)=>{
    const item= await prisma.watchlistItem.findUnique({
        where:{
            id:req.params.id,
        }
    })
    if(!item){
        return res.status(404).json({
            error:"nothing to delete"
        })
    }
    if(item.userId!=req.user.id){
        return res.status(403).json({
            error:"u are not the master of the watchlist",
        })
    }

    await prisma.watchlistItem.delete({
        where :{
            id:req.params.id
        }
    });
    res.status(201).json({
        status:"success",
        message:"successfully deleted the movie from the watch list",
    })


}

export const updateWatchlist = async (req,res)=>{
    const {status,rating,notes}=req.body;

    const item = await prisma.watchlistItem.findUnique({
        where:{
            id:req.params.id,
        }
    })
    if(!item){
        return res.status(404).json({
            error:"the moovie is not on the watch list",
        })
    }
    if(item.userId!=req.user.id){
        return res.status(403).json({
            error:"u are not authorized to update.",
        })
    }
    updateData={};

    if(rating!==undefined) updateData.rating=rating;
    if(status!=undefined) updateData.status=status.toUpperCase();
    if(notes!==undefined) updateData.notes=notes;

    await prisma.watchlistItem.update({
        where:{
            id:req.params.id,
        },
        data:updateData,
    });

    res.status(201).json({
        status:"success",
        message:"You Have Successfully Updated The Watchlist."
    })
}