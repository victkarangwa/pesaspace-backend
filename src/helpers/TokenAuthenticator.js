import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @export
 * @class TokenAuthenticator
 */
export default class TokenAuthenticator {
  /**
   * Store data in Jwt
   * @static
   * @param {object} data data object
   * @memberof TokenAuthenticator
   * @returns {object} token
   */
  static tokenGenerator(data) {
    const token = jwt.sign(data, process.env.JWT_KEY);
    return token;
  }
  /**
   * decode a JWT token
   * @static
   * @param {string} token signed token
   * @memberof TokenAuthenticator
   * @returns {object} payload
   */
  static decodeToken(token) {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    return payload;
  }
  /**
   * Store data in Jwt
   * @static
   * @param {object} data data object
   * @memberof AuthenticateToken
   * @returns {object} signToken
   */
  static signToken(data) {
    const token = jwt.sign(data, process.env.JWT_KEY);
    return token;
  }
}
