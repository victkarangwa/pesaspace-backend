const passwordGenerator = require("generate-password");
import TokenAuthenticator from "../helpers/TokenAuthenticator";
import Response from "../helpers/Response";
import httpStatus from "http-status";
import LoanService from "../services/LoanService";

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
}
export default LoanController;
