import express from "express";
import { addtoWatchlist, removefromWatchlist, updateWatchlist } from "../controllers/watchlistController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { addWatchlistSchema } from "../validators/watchlistValidators.js";


const router= express.Router();

router.use(authMiddleware);

router.post('/',validateRequest(addWatchlistSchema),addtoWatchlist);

router.put("/:id",updateWatchlist);

router.delete('/:id',removefromWatchlist);



export default router;