import express from "express";
import Validator from "../../middlewares/Validator";
import AuthController from "../../controllers/AuthController";
import {validateCredentials} from "../../middlewares/authorizer"
import { doesAccountExist, doesEmailExist } from "../../middlewares/scopeChecker";
import verifyToken from "../../middlewares/verifyToken";

const authRouter = express.Router();

authRouter.post(
  "/register",
  verifyToken,
  Validator.newAccountRules(),
  Validator.validateInput,
  doesAccountExist,
  AuthController.register
);

authRouter.post(
  "/login",
  Validator.loginRules(),
  Validator.validateInput,
  validateCredentials,
  AuthController.login
);

export default authRouter;
