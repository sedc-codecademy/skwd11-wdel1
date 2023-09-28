import { Forbidden } from "../const/error.const.js";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../const/jwt.const.js";
import { User } from "../models/user.model.js";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  // 1. Register User
  static async registerUser(req, res, next) {
    try {
      const userData = req.body;

      await AuthService.registerUser(userData);

      return res.sendStatus(200);
    } catch (error) {
      return next(error);
    }
  }

  //   2. Login user
  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.loginUser(email, password);

      const accessToken = createAccessToken(user._id);
      const refreshToken = createRefreshToken(user._id);

      await AuthService.saveRefreshToken(user, refreshToken);

      res.set("access-token", accessToken);
      res.set("refresh-token", refreshToken);
      // This is needed to allow browser-side javascript to be able to read the custom headers
      res.set("access-control-expose-headers", "access-token, refresh-token");

      return res.json(user);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static async refreshAccessToken(req, res, next) {
    try {
      // 1. Read refresh token from req.body
      const refreshToken = req.headers["refresh-token"];

      if (!refreshToken) throw new Forbidden();

      const foundUser = await AuthService.validateRefreshToken(refreshToken);

      await AuthService.deleteRefreshToken(foundUser, refreshToken);

      // 3. Generate new access token and send to client
      const accessToken = createAccessToken(foundUser._id);
      const newRefreshToken = createRefreshToken(foundUser._id);

      await AuthService.saveRefreshToken(foundUser, newRefreshToken);

      res.set("access-token", accessToken);
      res.set("refresh-token", newRefreshToken);
      res.set("access-control-expose-headers", "access-token, refresh-token");

      return res.sendStatus(200);
    } catch (error) {
      return next(error);
    }
  }

  static async logoutUser(req, res) {
    try {
      const user = req.user;

      const refreshToken = req.headers["refresh-token"];

      await AuthService.deleteRefreshToken(user, refreshToken);

      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  }

  static async logoutAll(req, res) {
    try {
      const user = req.user;

      await AuthService.deleteAllRefreshTokens(user);

      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  }
}
