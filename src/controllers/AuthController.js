const passwordGenerator = require("generate-password");
import TokenAuthenticator from "../helpers/TokenAuthenticator";
import Response from "../helpers/Response";
import httpStatus from "http-status";
import AuthService from "../services/AuthService";
import { users } from "../db/models";
import QueryService from "../services/QueryService";
import EmailTemplate from "../helpers/EmailTemplate";

class AuthController {
  static async register(req, res) {
    const userPassword = passwordGenerator.generate({
      length: 10,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    });
    const newUser = await AuthService.register(req, userPassword);
    const { password, ...data } = newUser.dataValues;
    const token = TokenAuthenticator.tokenGenerator(data);
    data.token = token;

    EmailTemplate.newInviteEmail(req, userPassword);

    Response.successMessage(
      res,
      "User has been registered and invite sent successfully!",
      { token },
      httpStatus.CREATED
    );
  }

  static async login(req, res) {
    const { result } = req;

    const { password: pwd, ...data } = result.dataValues;
    const token = TokenAuthenticator.signToken(data);

    await QueryService.update(users, [
      { isActive: true },
      { where: { id: data.id } },
    ]);

    res.cookie("token", token, { httpOnly: true });

    return Response.successMessage(
      res,
      "Logged in successfully",
      {token},
      httpStatus.OK
    );
  }

  static async viewAllUsers(req, res) {
    const allUsers = await AuthService.viewAllUsers(req);

    return Response.successMessage(
      res,
      "All platform users retrieved successfully",
      allUsers,
      httpStatus.OK
    );
  }

  static async viewProfile(req, res) {
    const profile = await AuthService.viewProfile(req);

    return Response.successMessage(
      res,
      "Profile retrieved successfully",
      profile,
      httpStatus.OK
    );
  }
}
export default AuthController;
