import { users } from "../db/models";
import QueryService from "../services/QueryService";
import TokenAuthenticator from "../helpers/TokenAuthenticator";
import Response from "../helpers/Response";
import HttpStatus from "http-status";

const isUserExist = async (req, res, next) => {
  try {
    const token =
      req.header("Authorization") ||
      req.params["x-auth-token"] ||
      req.params["token"] ||
      req.query["token"];
    if (!token) {
      return Response.errorMessage(
        res,
        "No token found!",
        HttpStatus.NOT_FOUND
      );
    }
    const payload = TokenAuthenticator.decodeToken(token);
    const { name } = payload;
    if (name === "JsonWebTokenError") {
      return Response.errorMessage(
        res,
        "Unauthorized, invalid token",
        HttpStatus.UNAUTHORIZED
      );
    }

    if (name === "TokenExpiredError") {
      return Response.errorMessage(
        res,
        "Unauthorized, Token has expired signin again to get new tokenn",
        HttpStatus.UNAUTHORIZED
      );
    }

    const validUser = await QueryService.findOne(users, {
      where: {
        id: payload.id,
      },
    });
    if (!validUser) {
      return Response.errorMessage(
        res,
        "You' re not authorized!",
        HttpStatus.UNAUTHORIZED
      );
    }
    req.user = payload;
    req.token = token;
    next();
  } catch (error) {
    return Response.errorMessage(
      res,
      "You can not proceed without setting a valid token",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
export default isUserExist;
