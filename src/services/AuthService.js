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
  static async register(req,userPassword) {
    const { first_name, last_name, email, role } = req.body;
    const hashedPassword = HashPassword.hashPassword(userPassword);
    const newUserObject = {
      id: uuid(),
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
      isVerified: true,
      isActive: false,
    };
    const newUser = await QueryService.create(users, newUserObject);
    return newUser;
  }
}
export default AuthService;
