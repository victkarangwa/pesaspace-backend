import express from "express";
import Validator from "../../middlewares/Validator";
import LoanController from "../../controllers/LoanController";
import { nidExist, productExist, unpaidLoanExist, tinExist, loanRequestExist } from "../../middlewares/scopeChecker";
import verifyToken from "../../middlewares/verifyToken";

const loanRouter = express.Router();

loanRouter.get(
  "/nida/:nid",
  Validator.nidRules(),
  Validator.validateInput,
  nidExist,
  LoanController.findNidaInfo
);

loanRouter.get(
  "/rra/:tin",
  Validator.tinRules(),
  Validator.validateInput,
  tinExist,
  LoanController.findrraInfo
);

loanRouter.post(
  "/apply",
  Validator.loanAppRules(),
  Validator.validateInput,
  unpaidLoanExist,
  productExist,
  LoanController.applyForLoan
);

loanRouter.get(
  "/all",
  verifyToken,
  LoanController.getAllLoanApplications
);

loanRouter.patch(
  "/:loan_id/:action",
  verifyToken,
  Validator.acceptOrRejectRules(),
  Validator.validateInput,
  LoanController.acceptOrRejectLoanApplication
);


loanRouter.get(
  "/find/:id",
  Validator.idRules(),
  Validator.validateInput,
  loanRequestExist,
  LoanController.findLoanRequest
);

export default loanRouter;
