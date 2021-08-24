import Response from "../helpers/Response";
import { users } from "../db/models";
import HttpStatus from "http-status";  
import HashPassword from "../helpers/HashPassword"
  

   export const validateCredentials = async (req, res, next) => { 
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