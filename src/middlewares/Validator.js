import { check, query, validationResult } from "express-validator";
import Response from "../helpers/Response";
import HashPassword from '../helpers/HashPassword';
import HttpStatus from 'http-status';
import { users } from '../db/models';

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
        check(
          "password",
          "A valid password should have a character, number, UPPER CASE letter and a lower case letter and should be longer than 8"
        )
          .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
          .custom((value, { req, loc, path }) => {
            if (value !== req.body.confirmPassword) {
              throw new Error("Passwords don't match");
            } else {
              return value;
            }
          }),
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
      check("email", "email should be valid").trim().isEmail(),
      check("password", "Password should be valid").isString(),
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
        'Account associated with this email does not exist. Kindly create one!', 
        HttpStatus.UNAUTHORIZED);
    }
  
    const isPasswordMatch = HashPassword.matchingPassword(password, result);
  
    if (!isPasswordMatch) {
      return Response.errorMessage(
        res, 
        'Email or password is incorrect',
        HttpStatus.UNAUTHORIZED);
    }
  
    req.result = result;
    next();
  };
}


export default Validator;
