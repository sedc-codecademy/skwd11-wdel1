import { createAccessToken } from "../const/jwt.const.js";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  // 1. Register User
  static async registerUser(req, res) {
    try {
      const userData = req.body;

      await AuthService.registerUser(userData);

      res.sendStatus(200);
    } catch (error) {
      res.status(400).send({ msg: error });
    }
  }

  //   2. Login user
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.loginUser(email, password);

      const accessToken = createAccessToken(user._id);

      res.json({ user, token: accessToken });
    } catch (error) {
      console.log(error);
      res.status(401).send({ msg: "Invalid Credentials" });
    }
  }
}
