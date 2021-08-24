import { v4 as uuid } from "uuid";
import { nida, products, loans } from "../db/models";
import QueryService from "./QueryService";
import HashPassword from "../helpers/HashPassword";

class LoanService {
  static async findIdInfo(req, userPassword) {
    const { nid } = req.params;
    const nidaObj = {
      where: { nid },
      attributes: ["first_name", "last_name", "dob", "nid", "sex"],
    };
    const nidaInfo = await QueryService.findOne(nida, nidaObj);
    return nidaInfo;
  }

  static async applyForLoan(req) {
    const {
      nid,
      address,
      email,
      phone,
      org_type,
      product_id,
      amount_borrowed,
      tin,
      reason,
    } = req.body;

    const productInfo = await products.findOne({ where: { id: product_id } });
    const nidaInfo = await nida.findOne({ where: { nid } });
    const applicationInfo = {
      id: uuid(),
      nid,
      first_name: nidaInfo.first_name,
      last_name: nidaInfo.last_name,
      address,
      email,
      phone,
      org_type,
      product_id,
      amount_borrowed,
      tin,
      total_amount: productInfo.total_amount,
      isPaid: false,
      total_amount_to_pay: ((productInfo.interest * amount_borrowed) + amount_borrowed).toFixed(2),
      amount_paid: 0,
      status: "pending",
      reason,
    };
    const appInfo = await QueryService.create(loans, applicationInfo);
    return appInfo;
  }
}
export default LoanService;
