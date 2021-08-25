import { v4 as uuid } from "uuid";
import { nida, products, loans, rra, crb } from "../db/models";
import QueryService from "./QueryService";
import HashPassword from "../helpers/HashPassword";

class LoanService {
  static async findLoanRequest(req) {
    const { id } = req.params;
    const nidaObj = {
      where: { id },
      include: [
        {
          as: "product",
          model: products,
          attributes: ["interest", "period"],
        },
      ],
      attributes: [
        "first_name",
        "last_name",
        "nid",
        "status",
        "total_amount_to_pay",
        "updatedAt",
        "createdAt"
      ],
    };

    const loanInfo = await QueryService.findOne(loans, nidaObj);
    let months;
    months =
      (new Date().getFullYear() - new Date(loanInfo.updatedAt).getFullYear()) *
      12;
    months -= new Date().getMonth();
    months += new Date(loanInfo.updatedAt).getMonth();

    const timeEllapsed = months < 0 ? -months : months;


    const loanPeriod = Number(loanInfo.product.period.split("m")[0]);

    const penalities = timeEllapsed > loanPeriod ? timeEllapsed * 10000 : 0;

    return { loanInfo, penalities };
  }

  static async findIdInfo(req) {
    const { nid } = req.params;
    const nidaObj = {
      where: { nid },
      attributes: ["first_name", "last_name", "dob", "nid", "sex"],
    };
    const nidaInfo = await QueryService.findOne(nida, nidaObj);
    return nidaInfo;
  }

  static async findTinInfo(req) {
    const { tin } = req.params;
    const rraObj = {
      where: { tin },
      attributes: ["nid", "company_name", "tin", "address", "isTaxCleared"],
    };
    const rraInfo = await QueryService.findOne(rra, rraObj);
    return rraInfo;
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
        (productInfo.interest * Number(amount_borrowed)) / 100 +
        Number(amount_borrowed)
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
    if(appsInfo.length){
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
          createdAt,
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
            createdAt
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
    return [];
  }

  static async acceptOrRejectLoanApplication(req) {
    const { action, loan_id } = req.params;
    const updateObj = [{ status: `${action}ed` }, { where: { id: loan_id } }];
    const updatedInfo = await QueryService.update(loans, updateObj);
    return updatedInfo;
  }
}
export default LoanService;
