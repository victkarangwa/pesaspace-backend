import express from "express";
import Validator from "../../middlewares/Validator";
import LoanController from "../../controllers/LoanController";
import { nidExist, productExist, unpaidLoanExist, tinExist, loanRequestExist } from "../../middlewares/scopeChecker";
import verifyToken from "../../middlewares/verifyToken";

const produtRoute = express.Router();

produtRoute.get(
  "/nida/:nid",
  Validator.nidRules(),
  Validator.validateInput,
  nidExist,
  LoanController.findNidaInfo
);


export default produtRoute;
