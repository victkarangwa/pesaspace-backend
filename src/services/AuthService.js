import { v4 as uuid } from "uuid";
import { users } from "../db/models";
import QueryService from "./QueryService";
import HashPassword from "../helpers/HashPassword";

class AuthService {
  /**
   * User new account creation method
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async register(req) {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = HashPassword.hashPassword(password);
    const newUserObject = {
      id: uuid(),
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: "user",
      isVerified: true,
      isActive: false,
    };
    const newUser = await QueryService.create(users, newUserObject);
    return newUser;
  }
}
export default AuthService;
