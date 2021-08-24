import express from "express";
import Validator from "../../middlewares/Validator";
import WalletController from "../../controllers/WalletController";
import {
  nidExist,
  productExist,
  unpaidLoanExist,
} from "../../middlewares/scopeChecker";
import verifyToken from "../../middlewares/verifyToken";

const walletRouter = express.Router();

walletRouter.post(
  "/deposit",
  verifyToken,
  Validator.amountRules(),
  Validator.validateInput,
  WalletController.deposit
);

walletRouter.get("/my", verifyToken, WalletController.viewUserWallet);

walletRouter.get("/revenue", verifyToken, WalletController.viewConsolidatedWallet);

export default walletRouter;
