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

  static async getAllLoanApplications(req, res) {
    const allLoanApps = await LoanService.getAllLoanApplications(req);

    Response.successMessage(
      res,
      "All loan applications retrieved successfully!",
      allLoanApps,
      httpStatus.OK
    );
  }

  static async acceptOrRejectLoanApplication(req, res) {
    const { action } = req.params;
    const loanResponse = await LoanService.acceptOrRejectLoanApplication(req);
    action === "accept"
      ? EmailTemplate.acceptEmail(req)
      : EmailTemplate.rejectEmail(req);
    Response.successMessage(
      res,
      `Loan application has been successfully ${action}ed`,
      loanResponse,
      httpStatus.OK
    );
  }
}
export default LoanController;
