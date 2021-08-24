const passwordGenerator = require("generate-password");
import TokenAuthenticator from "../helpers/TokenAuthenticator";
import Response from "../helpers/Response";
import httpStatus from "http-status";
import WalletService from "../services/WalletService";
import { users } from "../db/models";
import QueryService from "../services/QueryService";
import EmailTemplate from "../helpers/EmailTemplate";

class WalletController {
  static async deposit(req, res) {
    const dep = await WalletService.deposit(req);

    Response.successMessage(
      res,
      "Money deposited successfully",
      dep,
      httpStatus.OK
    );
  }

  static async viewUserWallet(req, res) {
    const wallet = await WalletService.viewUserWallet(req);

    Response.successMessage(
      res,
      "Wallet retrieved successfully",
      wallet,
      httpStatus.OK
    );
  }

  static async viewConsolidatedWallet(req, res) {
    const wallets = await WalletService.viewConsolidatedWallet(req);

    Response.successMessage(
      res,
      "Total revenue retrieved successfully",
      wallets,
      httpStatus.OK
    );
  }

}
export default WalletController;
