import Response from "../helpers/Response";
import { users } from "../db/models";
import HttpStatus from "http-status";

export const doesAccountExist = async (req, res, next) => {
  const { email } = req.body;
  const user = await users.findOne({ where: { email } });
  if (user) {
    return Response.errorMessage(res, "Email address already exists", 409);
  }
  next();
};

export const userExists = async (req, res, next) => {
  const { userId: id } = req.body;
  const user = await users.findOne({ where: { id } });
  if (!user) {
    return Response.errorMessage(
      res,
      "User with the provided ID does not exist",
      HttpStatus.NOT_FOUND
    );
  }

  next();
};



export const doesEmailExist = async (req, res, next) => {
  const { email } = req.body;
  const emailData = await users.findOne({
    where: { email: email.toLowerCase() },
  });
  if (emailData) {
    return Response.errorMessage(res, "We already have your email. Thank you!", 409);
  }
  next();
};

