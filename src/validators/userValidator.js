import {z} from "zod"


export const userRegistrationSchema = z.object({
  id: z.string().uuid("Invalid UUID"),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),

  email: z.string().trim
  ().min(1,"Minimum 1 email is required").email("Invalid email format").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const userLoginSchema = z.object({
    email: z.string().trim().min(1,"Minimum 1 email is required").email("Invalid email format").toLowerCase(),
    password :  z.string().min(8, "Password must be at least 8 characters"),

})