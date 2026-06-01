import express from "express";
import { Register,login, logout } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { userLoginSchema, userRegistrationSchema } from "../validators/userValidator.js";

const router= express.Router();

router.post('/register',validateRequest(userRegistrationSchema),Register);
router.post("/login",validateRequest(userLoginSchema),login)
router.post("/logout",logout)


export default router;