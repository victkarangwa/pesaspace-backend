const passwordGenerator = require("generate-password");
import TokenAuthenticator from "../helpers/TokenAuthenticator";
import Response from "../helpers/Response";
import httpStatus from "http-status";
import LoanService from "../services/LoanService";
import { users } from "../db/models";
import QueryService from "../services/QueryService";
import EmailTemplate from "../helpers/EmailTemplate";

class LoanController {
  static async findNidaInfo(req, res) {
    const nidaInfo = await LoanService.findIdInfo(req);

    Response.successMessage(
      res,
      "User data retrieved from NIDA successfully!",
      nidaInfo,
      httpStatus.OK
    );
  }

  static async applyForLoan(req, res) {
    const appInfo = await LoanService.applyForLoan(req);

    const adminData = await QueryService.findAll(users, {
      where: { role: "admin" },
    });

    const admins = adminData.map((admin) => admin.email);

    EmailTemplate.newApplicationEmail(req, admins);

    Response.successMessage(
      res,
      "You loan application successfully!",
      appInfo,
      httpStatus.ACCEPTED
    );
  }
}
export default LoanController;
