import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Email from "./Email";

dotenv.config();
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: "true",
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
});

class EmailHelper {
  static async newApplicationEmail(req,admins) {
    const info = await transporter.sendMail(Email.newApplication(req,admins));
  }

  static async newInviteEmail(req, userPassword) {
    const info = await transporter.sendMail(Email.newUserInvite(req, userPassword));
  }

  static async rejectEmail(req) {
    const info = await transporter.sendMail(Email.rejectedApplication(req));
  }

  static async acceptEmail(req) {
    const info = await transporter.sendMail(Email.acceptedApplication(req));
  }
}

export default EmailHelper;
