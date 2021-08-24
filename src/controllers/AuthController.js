import { v4 as uuid } from "uuid";
import TokenAuthenticator from "../helpers/TokenAuthenticator";
import Response from "../helpers/Response";
import httpStatus from "http-status";
import AuthService from "../services/AuthService";
import { users } from "../db/models";
import QueryService from "../services/QueryService";
import EmailTemplate from "../helpers/EmailTemplate";

class AuthController {
  static async register(req, res) {
    const newUser = await AuthService.register(req);
    const { password, ...data } = newUser.dataValues;
    const token = TokenAuthenticator.tokenGenerator(data);
    data.token = token;

    EmailTemplate.newInviteEmail(req);

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
      { where: { id: data.id, } },
    ]);

    res.cookie("token", token, { httpOnly: true });

    return Response.successMessage(
      res,
      "Logged in successfully",
      "",
      httpStatus.OK
    );
  }
}
export default AuthController;
