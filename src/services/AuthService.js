import { v4 as uuid } from "uuid";
import { users, wallets } from "../db/models";
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
  static async register(req, userPassword) {
    const { first_name, last_name, email, role } = req.body;
    const hashedPassword = HashPassword.hashPassword(userPassword);

    const user_id = uuid();
    const newUserObject = {
      id: user_id,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
      isVerified: true,
      isActive: false,
    };
    const newUser = await QueryService.create(users, newUserObject);
    await QueryService.create(wallets, {
      id: uuid(),
      user_id: user_id,
      balance: 0,
      currency: "RWF",
    });
    return newUser;
  }

  static async viewAllUsers(req) {
    const allUsers = await QueryService.findAll(users, {
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "role",
        "isVerified",
        "isActive",
      ],
    });
    return allUsers;
  }

  static async viewProfile(req) {
    const userProfile = await QueryService.findOne(users, {
      where: { id: req.user.id },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "role",
        "isVerified",
        "isActive",
      ],
    });
    return userProfile;
  }
}
export default AuthService;
