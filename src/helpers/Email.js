import dotenv from "dotenv";

dotenv.config();
const { EMAIL_ADDRESS, WEB_BASE_URL, BASE_URL_PATH } = process.env;

/**
 * @export
 * @class Email
 */
class Email {
  /**
   * register a new
   * @static
   * @param {Object} req request object
   * @param {Object} user user
   * @returns {Object} Subscription Email template for new user
   */
  static newUserInvite(req) {
    const { email } = req.body;
    return {
      to: email,
      subject: "Invitation - Pesa Space",
      html: `<div style="position: absolute; width: 100%; height: 100%; background-color: #f4f4f4;">
      <div style="display: flex; height: 120px; font-size: 25px;">
      <div>
      <h3 style="color: #000436; margin-left: 20px; font-weight: 900;">Pesa Space</h3>
      </div>
      </div>
      <div style="height: 60%; margin: auto; width: 94%; text-align: left; background-color: #ffff; -webkit-box-shadow: 5px 5px 5px 5px black; -moz-box-shadow: 5px 5px 5px 5px black; box-shadow: 5px 5px 5px 5px black;">
      <div style="height: 65%; padding: 10px;">
      <p>Hi there</p>
      <p>You have been invited to <a href="https://pesaspace.netlify.app">Pesa Space Platform</a>. Please <a href="https://pesaspace.netlify.app/login">login</a> for more details.</p>
      </div>
      </div>
      </div>`,
    };
  }

  /**
   * new application
   * @static
   * @param {Object} req request object
   * @param {Object} user user
   * @returns {Object} Subscription Email template for new application
   */
  static newApplication(req) {
    const { first_name, last_name } = req.body;
    return {
      to: email,
      subject: "New loan application - Pesa Space",
      html: `<div style="position: absolute; width: 100%; height: 100%; background-color: #f4f4f4;">
      <div style="display: flex; height: 120px; font-size: 25px;">
      <div>
      <h3 style="color: #000436; margin-left: 20px; font-weight: 900;">Pesa Space</h3>
      </div>
      </div>
      <div style="height: 60%; margin: auto; width: 94%; text-align: left; background-color: #ffff; -webkit-box-shadow: 5px 5px 5px 5px black; -moz-box-shadow: 5px 5px 5px 5px black; box-shadow: 5px 5px 5px 5px black;">
      <div style="height: 65%; padding: 10px;">
      <p>Dear Pesa Space management,</p>
      <p>${first_name} ${last_name} has applied for a loan. Please <a href="https://pesaspace.netlify.app/login">login</a> for more details.</p>
      </div>
      </div>
      </div>`,
    };
  }

  /**
   * rejection email
   * @static
   * @param {Object} req request object
   * @param {Object} user user
   * @returns {Object} Subscription Email template for reject application
   */
  static rejectedApplication(req) {
    const { first_name, last_name } = req.body;
    return {
      to: email,
      subject: "Your application status - Pesa Space",
      html: `<div style="position: absolute; width: 100%; height: 100%; background-color: #f4f4f4;">
        <div style="display: flex; height: 120px; font-size: 25px;">
        <div>
        <h3 style="color: #000436; margin-left: 20px; font-weight: 900;">Pesa Space</h3>
        </div>
        </div>
        <div style="height: 60%; margin: auto; width: 94%; text-align: left; background-color: #ffff; -webkit-box-shadow: 5px 5px 5px 5px black; -moz-box-shadow: 5px 5px 5px 5px black; box-shadow: 5px 5px 5px 5px black;">
        <div style="height: 65%; padding: 10px;">
        <p>Hi there,</p>
        <p>We regret to inform you that your loan application at Pesa Space has been rejected due to the following reason:</p>
        <p>- ${reason}</p>
        </div>
        </div>
        </div>`,
    };
  }

  /**
   * rejection email
   * @static
   * @param {Object} req request object
   * @param {Object} user user
   * @returns {Object} Subscription Email template for reject application
   */
  static acceptedApplication(req) {
    const { first_name, last_name } = req.body;
    return {
      to: email,
      subject: "Congraturations - Pesa Space",
      html: `<div style="position: absolute; width: 100%; height: 100%; background-color: #f4f4f4;">
            <div style="display: flex; height: 120px; font-size: 25px;">
            <div>
            <h3 style="color: #000436; margin-left: 20px; font-weight: 900;">Pesa Space</h3>
            </div>
            </div>
            <div style="height: 60%; margin: auto; width: 94%; text-align: left; background-color: #ffff; -webkit-box-shadow: 5px 5px 5px 5px black; -moz-box-shadow: 5px 5px 5px 5px black; box-shadow: 5px 5px 5px 5px black;">
            <div style="height: 65%; padding: 10px;">
            <p>Hi there,</p>
            <p>We are pleased to inform you that your loan application at Pesa Space has been accepted. Please contact us at <a href="mailto:loans@pesaspace.com">loans@pesaspace.com</a> for more info</p>
            </div>
            </div>
            </div>`,
    };
  }
}

export default Email;
