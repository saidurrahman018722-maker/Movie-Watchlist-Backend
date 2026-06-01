import { z } from "zod";

export const addWatchlistSchema = z.object({
  movieId: z.string().uuid(),
  
  status: z.enum(["PLANNED", "WATCHING", "DROPED", "COMPLETED"], {
    invalid_type_error: `This status is not in the system. It must be -> "PLANNED", "WATCHING", "DROPED", or "COMPLETED".`
  }).optional(),
  
 
  rating: z.coerce.number()
    .int("Rating must be an integer.")
    .min(1, "Rating must be between 1 to 10")
    .max(10, "Rating must be between 1 to 10")
    .optional(),
    
  notes: z.string().optional(),
});