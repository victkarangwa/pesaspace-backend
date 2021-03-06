import { check, query, validationResult } from "express-validator";
import Response from "../helpers/Response";
import HashPassword from "../helpers/HashPassword";
import HttpStatus from "http-status";
import { users } from "../db/models";

/**
 * @export
 * @class Validator
 */
class Validator {
  /**
   * Validate new account input
   * @static
   * @returns {object} errors
   */
  static newAccountRules() {
    return [
      check("first_name", "First name should be valid").isString(),
      check("last_name", "Last name should be valid").isString(),
      check("email", "email should be valid").isEmail(),
      check("role", "role should be valid").isIn(["admin", "shareholder"]),
    ];
  }

  /**
   * Validate nid
   * @static
   * @returns {object} errors
   */
  static nidRules() {
    return [
      check("nid", "National ID should be valid (contain 15 digits)").isLength({
        min: 15,
        max: 15,
      }),
    ];
  }

  static idRules() {
    return [
      check("id", "ID should be valid").isUUID()
    ];
  }

  static tinRules() {
    return [
      check("tin", "TIN number should be valid (contain 9 digits)").isLength({
        min: 9,
        max: 9,
      }),
    ];
  }

  static amountRules() {
    return [
      check("amount", "Amount to deposit should be valid").isFloat(),
    ];
  }

  /**
   * Validate nid
   * @static
   * @returns {object} errors
   */
  static loanAppRules() {
    return [
      check(
        "nid",
        "National ID should be valid (contain 16 digits)"
      ).isString(),
      check("first_name", "First name should be valid").isString(),
      check("last_name", "Last name should be valid").isString(),
      check("address", "address should be valid").isString(),
      check("email", "email should be valid").isEmail(),
      check("phone", "phone should be valid").isString(),
      check(
        "org_type",
        "organization should be valid (individual or company)"
      ).isIn(["individual", "company"]),
      check("product_id", "address should be valid").isString(),
      check(
        "tin",
        "TIN should be valid (9 digits starting with 0 or 9)"
      ).optional(),
      check("amount_borrowed", "amount borrowed should be valid").isFloat(),
      check("reason", "Reason  should be valid").isString(),
    ];
  }

  /**
   * Validate input
   * @static
   * @returns {object} error description OR return next middleware
   */
  static validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.errors.map((err) => err.msg);
      return Response.errorMessage(res, errorMessage, 400);
    }
    return next();
  };

  /**
   * Validate login input
   * @static
   * @returns {object} errors
   */
  static loginRules() {
    return [
      check("email", "email should be valid").isEmail(),
      check("password", "Password should be valid").isString(),
    ];
  }

  static acceptOrRejectRules() {
    return [
      check("loan_id", "Loan ID should be valid").isUUID(),
      check("action", "Action should be valid (accept or reject)").isIn([
        "accept",
        "reject",
      ]),
      check("reason", "Reason should be valid").isString(),
    ];
  }

  /**
   * Validate login credentials
   * @static
   * @returns {object} errors
   */
  static validateCredentials = async (req, res, next) => {
    const { email, password } = req.body;
    const result = await users.findOne({ where: { email } });

    if (!result) {
      return Response.errorMessage(
        res,
        "Account associated with this email does not exist. Kindly create one!",
        HttpStatus.UNAUTHORIZED
      );
    }

    const isPasswordMatch = HashPassword.matchingPassword(password, result);

    if (!isPasswordMatch) {
      return Response.errorMessage(
        res,
        "Email or password is incorrect",
        HttpStatus.UNAUTHORIZED
      );
    }

    req.result = result;
    next();
  };
}

export default Validator;
