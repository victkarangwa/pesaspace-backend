import Response from "../helpers/Response";
import { users, nida, products, loans, rra } from "../db/models";
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

export const nidExist = async (req, res, next) => {
  const { nid } = req.params;
  const info = await nida.findOne({ where: { nid } });
  if (!info) {
    return Response.errorMessage(
      res,
      "National ID not found",
      HttpStatus.NOT_FOUND
    );
  }

  next();
};

export const loanRequestExist = async (req, res, next) => {
  const { id } = req.params;
  const info = await loans.findOne({ where: { id } });
  if (!info) {
    return Response.errorMessage(
      res,
      "Request ID not found",
      HttpStatus.NOT_FOUND
    );
  }

  next();
};

export const tinExist = async (req, res, next) => {
  const { tin } = req.params;
  const info = await rra.findOne({ where: { tin } });
  if (!info) {
    return Response.errorMessage(
      res,
      "TIN number not found",
      HttpStatus.NOT_FOUND
    );
  }

  next();
};

export const productExist = async (req, res, next) => {
  const { product_id } = req.body;
  const info = await products.findOne({ where: { id:product_id } });
  if (!info) {
    return Response.errorMessage(
      res,
      "Product not found",
      HttpStatus.NOT_FOUND
    );
  }

  next();
};

export const unpaidLoanExist = async (req, res, next) => {
  const { nid } = req.body;
  const {status, isPaid} = await loans.findOne({ where: { nid }}) || {  };
  if (status==="pending") {
    return Response.errorMessage(
      res,
      "You already have a pending loan application request.",
      HttpStatus.CONFLICT
    );
  }

  if (isPaid === false) {
    return Response.errorMessage(
      res,
      "You have unpaid pending loan. Please, settle it and come back.",
      HttpStatus.BAD_REQUEST
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

