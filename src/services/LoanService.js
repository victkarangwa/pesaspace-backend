import { v4 as uuid } from "uuid";
import { nida } from "../db/models";
import QueryService from "./QueryService";
import HashPassword from "../helpers/HashPassword";

class LoanService {
  /**
   * User new account creation method
   * @static
   * @param {object} req  request object
   * @memberof LoanService
   * @returns {object} data
   */
  static async findIdInfo(req, userPassword) {
    const { nid } = req.params;
    const newUserObject = {
      where: { nid },
      attributes: ["first_name", "last_name", "dob", "nid", "sex"],
    };
    const nidaInfo = await QueryService.findOne(nida, newUserObject);
    return nidaInfo;
  }
}
export default LoanService;
