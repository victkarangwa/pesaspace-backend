import express from "express";
import Validator from "../../middlewares/Validator";
import LoanController from "../../controllers/LoanController";
import { nidExist, productExist, unpaidLoanExist } from "../../middlewares/scopeChecker";
import verifyToken from "../../middlewares/verifyToken";

const loanRouter = express.Router();

loanRouter.get(
  "/nida/:nid",
  Validator.nidRules(),
  Validator.validateInput,
  nidExist,
  LoanController.findNidaInfo
);

loanRouter.post(
  "/apply",
  Validator.loanAppRules(),
  Validator.validateInput,
  unpaidLoanExist,
  productExist,
  LoanController.applyForLoan
);


export default loanRouter;
