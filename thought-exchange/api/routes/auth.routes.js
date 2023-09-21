import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

export const authRouter = Router();

// 1. Login User `POST /auth/login`
authRouter.post("/login", AuthController.loginUser);
// 2. Register User `POST /auth/register`
authRouter.post("/register", AuthController.registerUser);
// 3. Log out user `POST /auth/logout`
// 4. Refresh Token `POST /auth/refresh-token`
