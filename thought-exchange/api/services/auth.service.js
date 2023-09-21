import { User } from "../models/user.model.js";

export class AuthService {
  // 1. Register User
  static async registerUser(userData) {
    const user = new User(userData);

    await user.save();
  }
  // 2. Login User
  static async loginUser(email, password) {
    const user = await User.findOne({ email });

    if (!user) throw "Invalid Credentails";

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) throw "Invalid Credentials";

    return user;
  }
}
