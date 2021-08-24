import express from "express";
import Validator from "../../middlewares/Validator";
import LoanController from "../../controllers/LoanController";
import {validateCredentials} from "../../middlewares/authorizer"
import { nidExist } from "../../middlewares/scopeChecker";
import verifyToken from "../../middlewares/verifyToken";

const loanRouter = express.Router();

loanRouter.get(
  "/nida/:nid",
  verifyToken,
  Validator.nidRules(),
  Validator.validateInput,
  nidExist,
  LoanController.findNidaInfo
);


export default loanRouter;
