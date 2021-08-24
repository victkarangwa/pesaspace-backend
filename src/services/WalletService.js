import { v4 as uuid } from "uuid";
import { wallets } from "../db/models";
import QueryService from "./QueryService";
import HashPassword from "../helpers/HashPassword";

class WalletService {
  static async deposit(req) {
    const {
      user: { id: user_id },
      body: { amount },
    } = req;
    const { balance: curBalance } = await QueryService.findOne(wallets, {
      where:{user_id},
    });
    const obj = [
      { balance: +amount + +curBalance },
      { where: { user_id: user_id } },
    ];
    const updatedWallet = await QueryService.update(wallets, obj);
    return updatedWallet;
  }

  static async viewUserWallet(req) {
    const {
      user: { id: user_id },
    } = req;
    const userWallet = await QueryService.findOne(wallets, {
      where: { user_id },
    });
    return userWallet;
  }

  static async viewConsolidatedWallet(req) {
    const allWallets = await QueryService.findAll(wallets);
    const totalRevenue = allWallets.reduce((a, b) => a + +b.balance, 0);
    return {totalRevenue};
  }
}
export default WalletService;
