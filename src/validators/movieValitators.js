import { z } from "zod";


export const movieSchema = z.object({
    title : z.string().trim().min(1,"the movie title is required"),

    id : z.string().uuid(),

    releaseYear : z.coerce.number().int("the Year has to be a Integer").min(1880,"the releaseYear has to be greater then 1880").max(new Date().getFullYear()+10,"the year has to be a valid year."),

    genres : z.array(z.string(),{message:"all genres must be a string"}),

    runtime : z.coerce.number().int("the run time must be an Integer.").positive("the runtime must a posiive number").optional(),

    posterUrl : z.string().url("poster url must be a valid url.").optional(),
})



