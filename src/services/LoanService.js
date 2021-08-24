import { v4 as uuid } from "uuid";
import { nida, products, loans, rra, crb } from "../db/models";
import QueryService from "./QueryService";
import HashPassword from "../helpers/HashPassword";

class LoanService {
  static async findIdInfo(req) {
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
      total_amount_to_pay: (
        (productInfo.interest * amount_borrowed) / 100 +
        amount_borrowed
      ).toFixed(2),
      amount_paid: 0,
      status: "pending",
      reason,
    };
    const appInfo = await QueryService.create(loans, applicationInfo);
    return appInfo;
  }

  static async getAllLoanApplications(req) {
    const { nid } = req.params;
    const appsaObj = {
      where: {},
      // attributes: ["first_name", "last_name", "dob", "nid", "sex"],
    };
    const appsInfo = await QueryService.findAll(loans, appsaObj);
    const formattedInfo = await Promise.all(
      appsInfo.map(
        async ({
          id,
          first_name,
          last_name,
          email,
          status,
          phone,
          amount_borrowed,
          total_amount_to_pay,
          isPaid,
          amount_paid,
          tin,
          nid,
        }) => {
          const data = {
            id,
            first_name,
            last_name,
            email,
            status,
            phone,
            amount_borrowed,
            total_amount_to_pay,
            isPaid,
            amount_paid,
          };

          const rraData = await rra.findOne({ where: { tin } });
          const crbData = await crb.findOne({ where: { nid } });

          data.hasRRAflag = rraData.isTaxCleared;
          data.hasCRBflag = crbData?.credit > 0;

          return data;
        }
      )
    );
    return formattedInfo;
  }

  static async acceptOrRejectLoanApplication(req) {
    const { action, loan_id } = req.params;
    const updateObj = [{ status: `${action}ed` }, { where: { id: loan_id } }];
    const updatedInfo = await QueryService.update(loans, updateObj);
    return updatedInfo;
  }
}
export default LoanService;
