import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import {
  entityValidator,
  userSchema,
} from "../middlewares/entity-validator.middleware.js";
import { authValidator } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

// 1. Login User `POST /auth/login`
authRouter.post("/login", AuthController.loginUser);
// 2. Register User `POST /auth/register`
authRouter.post(
  "/register",
  entityValidator(userSchema),
  AuthController.registerUser
);
// 4. Refresh Token `POST /auth/refresh-token`
authRouter.post("/refresh-token", AuthController.refreshAccessToken);
// 4. Log out user `POST /auth/logout`
authRouter.post("/logout", authValidator, AuthController.logoutUser);
// 5. Log out all `POST /auth/logout-all`
authRouter.post("/logout-all", authValidator, AuthController.logoutAll);
